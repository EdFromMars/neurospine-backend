import express from 'express';
import dbConnection from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

dbConnection();

const dominiosPermitidos = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (dominiosPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Dominio no permitido'));
    }
  }
}

app.use(cors(corsOptions));

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});