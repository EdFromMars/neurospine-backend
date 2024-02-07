import Usuario from '../models/Usuario.js';

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

const login = (req, res) => {
  res.json('Desde API/USUARIOS/login');
};

const perfil = (req, res) => {
  res.json('Desde API/USUARIOS/PERFIL');
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

export { registro, login, perfil, confirmarEmail };