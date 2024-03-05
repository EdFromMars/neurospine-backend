import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

import {
  agregarHospital,
  obtenerHospitales,
  obtenerHospital,
  actualizarHospital,
  eliminarHospital
} from '../controllers/hospitalController.js';

router.post('/', checkAuth, agregarHospital);
router.get('/', checkAuth, obtenerHospitales);
router.get('/:id', checkAuth, obtenerHospital);
router.put('/:id', checkAuth, actualizarHospital);
router.delete('/:id', checkAuth, eliminarHospital);

export default router;