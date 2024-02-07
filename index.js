import express from 'express';
import dbConnection from './config/db.js';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

dbConnection();

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});