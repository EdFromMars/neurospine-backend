import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registro = async (req, res) => {
  const { email } = req.body;
  
  const emaildominio = email.split('@')[1];
  if(emaildominio !== 'neurospine.com') {
    return res.status(400).json({msg: 'Correo no valido, debe ser de la empresa Neurospine.com'});
  }

  const existeEmail = await Usuario.findOne({ email });

  if(existeEmail) {
    return res.status(400).json({msg: 'El correo ya esta registrado'});
  }
  
  try {
    const usuario = new Usuario(req.body);
    const usuarioGuardado = await usuario.save();

    res.json(usuarioGuardado);
  } catch (error) {
    console.log(error);
  }  
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if(!usuario) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }

  if(!usuario.confirmado) {
    return res.status(400).json({ msg: 'El usuario no ha confirmado su correo' });
  }

  if(await usuario.compararPassword(password)) {
    res.json({ token: generarJWT(usuario.id) });
  }else {
    return res.status(400).json({ msg: 'Password incorrecto' });
  }
};

const perfil = (req, res) => {
  const { usuario } = req;
  res.json( usuario );
};

const confirmarEmail = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Usuario.findOne({ token });

  if(!usuarioConfirmar) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;

    await usuarioConfirmar.save();

    res.json({ msg: 'Correo confirmado' });
  } catch (error) {
    console.log(error);
  }
};

export { registro, autenticar, perfil, confirmarEmail };