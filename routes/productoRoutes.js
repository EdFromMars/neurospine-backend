import checkAuth from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

import {
  agregarProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productoController.js';

router.route('/')
  .post(checkAuth, agregarProducto)
  .get(checkAuth, obtenerProductos);

router
  .route('/:id')
  .get(checkAuth, obtenerProducto)
  .put(checkAuth, actualizarProducto)
  .delete(checkAuth, eliminarProducto);

export default router;