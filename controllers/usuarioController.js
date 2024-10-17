import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';

const registro = async (req, res) => {
  const { email, nombre } = req.body;
  
  const emaildominio = email.split('@')[1];
  if(emaildominio !== 'neurospine.com') {
    return res.status(400).json({msg: 'Correo no valido'});
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
    return res.status(404).json({ msg: 'El usuario no existe' });
  }

  if(!usuario.confirmado) {
    return res.status(400).json({ msg: 'El usuario no ha confirmado su correo' });
  }

  if(usuario.bloqueado) {
    return res.status(400).json({ msg: 'El acceso esta bloqueado' });
  }

  if(await usuario.compararPassword(password)) {
    res.json({ 
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      puesto: usuario.puesto,
      locacion: usuario.locacion,
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

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select('-password -token -confirmado -createdAt -updatedAt -__v');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id)
    .select('-password -token -confirmado -createdAt -updatedAt -__v');
  res.json(usuario);
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  if(usuario._id.toString() !== req.body._id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  //Actualizar usuario
  usuario.nombre = req.body.nombre || usuario.nombre;
  usuario.telefono = req.body.telefono || usuario.telefono;
  usuario.direccion = req.body.direccion || usuario.direccion;
  usuario.puesto = req.body.puesto || usuario.puesto;
  usuario.locacion = req.body.locacion || usuario.locacion;
  usuario.zonas = req.body.zonas || usuario.zonas;
  usuario.bloqueado = req.body.bloqueado === true || false;
  usuario.documentos = req.body.documentos || usuario.documentos;
  usuario.password = req.body.password || usuario.password;
  
  try {
    const usuarioActualizado = await usuario.save();
    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al bloquear usuario:', error);
    res.status(500).json({ msg: 'Error al bloquear usuario' });
  }
};

export { 
  registro, 
  autenticar, 
  perfil, 
  confirmarEmail,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario
};