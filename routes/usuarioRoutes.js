import express from 'express';
import { registro, login, perfil, confirmarEmail } from '../controllers/usuarioControllers.js';

const router = express.Router();

router.get('/', login);
router.post('/registro', registro);
router.get('/perfil', perfil);
router.get('/confirmar/:token', confirmarEmail);

export default router;