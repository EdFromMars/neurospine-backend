import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

import { agregarBitacora } from '../controllers/bitacoraController.js';

router.post('/', checkAuth, agregarBitacora);

export default router;