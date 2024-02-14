import express from 'express';
import checkAuth from '../middleware/authMiddleware';

const router = express.Router();

import { agregarBitacora } from '../controllers/bitacoraController';

router.post('/', checkAuth, agregarBitacora);

export default router;