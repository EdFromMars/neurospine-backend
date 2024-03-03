import express from 'express';
import {
  agregarZona,
  obtenerZonas,
  obtenerZona,
  actualizarZona,
  eliminarZona
} from '../controllers/zonasController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, agregarZona)
  .get(checkAuth, obtenerZonas);

router.route('/:id')
  .get(checkAuth, obtenerZona)
  .put(checkAuth, actualizarZona)
  .delete(checkAuth, eliminarZona);

export default router;