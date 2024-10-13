import express from 'express';
import dbConnection from './config/db.js';
import dbEvents from './config/dbEvents.js';
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

app.get('/events', cors(corsOptions), (req, res) => {

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

  // Envía un mensaje inicial para establecer la conexión
  res.write(`data: ${JSON.stringify({message: 'Conexión establecida'})}\n\n`);

  // Mantén la conexión abierta con un heartbeat
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({message: 'heartbeat', timestamp: new Date().toISOString()})}\n\n`);
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
}, (error, req, res, next) => {
  console.log('Error en la ruta /events:', error.message);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});


const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await dbEvents();
    
    console.log('Eventos de base de datos iniciados correctamente');
    
  } catch (error) {
    console.error('Error al iniciar eventos de base de datos:', error);
  }
  
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
startServer().catch(console.error);
