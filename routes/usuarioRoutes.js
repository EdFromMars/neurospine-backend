import express from 'express';
import { registro, autenticar, perfil, confirmarEmail } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar);
router.post('/registro', registro);
router.get('/perfil', checkAuth, perfil);
router.get('/confirmar/:token', confirmarEmail);

export default router;