import express from 'express';
import { registro, login, perfil } from '../controllers/usuarioControllers.js';

const router = express.Router();

router.get('/', login);
router.post('/registro', registro);
router.get('/perfil', perfil);

export default router;