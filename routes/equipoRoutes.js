import express from 'express';
import {
  obtenerUsuarios,
  bloquearUsuario
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/lista-usuarios', checkAuth, obtenerUsuarios);
router.put('/bloquear-usuario/:id', checkAuth, bloquearUsuario);

export default router;