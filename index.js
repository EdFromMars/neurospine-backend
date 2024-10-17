import express from 'express';
import dbConnection from './config/db.js';
import { dbEvents, connectToMongo } from './config/dbEvents.js';
import dotenv from 'dotenv';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import bitacoraRoutes from './routes/bitacoraRoutes.js';
import locacionesRoutes from './routes/locacionesRoutes.js';
import zonaRoutes from './routes/zonasRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import razonSocialRoutes from './routes/razonSocialRoutes.js';
import materialApoyoRoutes from './routes/materialApoyoRoutes.js';
import programacionRoutes from './routes/programacionRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import piezasMaterialApoyoRoutes from './routes/piezasMaterialApoyoRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

dbConnection();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors({
  origin: corsOptions.origin,
  credentials: corsOptions.credentials
}));

app.use((req, res, next) => {
  res.setHeader('Feature-Policy', "clipboard-write 'self'");
  next();
});


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes, materialApoyoRoutes);
app.use('/api/material-apoyo', materialApoyoRoutes);
app.use('/api/piezas-material-apoyo', piezasMaterialApoyoRoutes);
app.use('/api/bitacora', bitacoraRoutes);
app.use('/api/locaciones', locacionesRoutes);
app.use('/api/zonas', zonaRoutes);
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/doctores', doctorRoutes);
app.use('/api/razon-social', razonSocialRoutes);
app.use('/api/programacion', programacionRoutes);
app.use('/api/equipo', equipoRoutes);

//Notificaciones SSE
const clients = new Set();

function sendEventToAll(eventData) {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  });
}

app.options('/events', cors(corsOptions));

app.get('/events', cors(corsOptions), async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.add(newClient);

  req.on('close', () => {
    console.log(`Cliente ${clientId} desconectado`);
    clients.delete(newClient);
  });

  const sendEvent = (data) => {
    res.write(`data: ${data}\n\n`);
  };

  try {
    await dbEvents(sendEvent);
  } catch (error) {
    console.error('Error en dbEvents:', error);
    sendEvent(JSON.stringify({ type: 'error', message: 'Error en la conexión de eventos' }));
  }
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectToMongo();
    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${server.address().port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Puerto ${PORT} está en uso, intentando con el puerto ${PORT + 1}`);
        server.close();
        startServer(PORT + 1);
      } else {
        console.error('Error al iniciar el servidor:', error);
      }
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer().catch(console.error);
