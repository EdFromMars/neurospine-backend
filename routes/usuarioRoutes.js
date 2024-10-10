import express from 'express';
import { 
  registro, 
  autenticar, 
  perfil, 
  confirmarEmail,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', autenticar);
router.post('/registro', registro);
router.get('/confirmar/:token', confirmarEmail);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

//Área Protegida
router.get('/perfil', checkAuth, perfil);

export default router;