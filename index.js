import express from 'express';
import dbConnection from './config/db.js';
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
  origin: (origin, callback) => {
    if (dominiosPermitidos.includes(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Dominio no permitido'));
    }
  }
}

app.use((req, res, next) => {
  res.setHeader('Feature-Policy', "clipboard-write 'self'");
  next();
});

app.use(cors(corsOptions));

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

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});