import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

const registro = async (req, res) => {
  const { email, nombre } = req.body;
  
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

    emailRegistro({
      email, 
      nombre, 
      token: usuarioGuardado.token
    });

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
    res.json({ 
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      puesto: usuario.puesto,
      token: generarJWT(usuario.id) 
    });
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

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if(!existeUsuario) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();

    //Enviar email con instrucciones para reestablecer el password
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token
    });

    res.json({ msg: 'Se ha enviado un correo para reestablecer el password' });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const existeUsuario = await Usuario.findOne({ token });

  if(existeUsuario) {
    return res.json({ msg: 'Token valido' });
  } else {
    return res.status(400).json({ msg: 'Token no valido' });
  }
};

const nuevoPassword = async (req, res) => {
  console.log(req.params);
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });

  if(!usuario) {
    return res.status(400).json({ msg: 'Hubo un error' });
  }

  try {
    usuario.password = password;
    usuario.token = null;

    await usuario.save();

    res.json({ msg: 'Password actualizado' });
  } catch (error) {
    console.log(error);
  }
};

export { 
  registro, 
  autenticar, 
  perfil, 
  confirmarEmail,
  olvidePassword,
  comprobarToken,
  nuevoPassword
};