import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

import {
  agregarLocacion,
  obtenerLocaciones,
  obtenerLocacion,
  actualizarLocacion,
  eliminarLocacion
} from '../controllers/locacionesController.js';

router.post('/', checkAuth, agregarLocacion);
router.get('/', checkAuth, obtenerLocaciones);
router.get('/:id', checkAuth, obtenerLocacion);
router.put('/:id', checkAuth, actualizarLocacion);
router.delete('/:id', checkAuth, eliminarLocacion);

export default router;