import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

import {
  agregarDoctor,
  obtenerDoctores,
  obtenerDoctor,
  actualizarDoctor,
  eliminarDoctor
} from '../controllers/doctorController.js';

router.post('/', checkAuth, agregarDoctor);
router.get('/', checkAuth, obtenerDoctores);
router.get('/:id', checkAuth, obtenerDoctor);
router.put('/:id', checkAuth, actualizarDoctor);
router.delete('/:id', checkAuth, eliminarDoctor);

export default router;