import express from 'express';
import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerUsuario
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/lista-usuarios', checkAuth, obtenerUsuarios);
router.put('/actualizar-usuario/:id', checkAuth, actualizarUsuario);
router.get('/obtener-usuario/:id', checkAuth, obtenerUsuario);

export default router;