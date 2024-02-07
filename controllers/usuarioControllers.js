import Usuario from '../models/Usuario.js';

const registro = async (req, res) => {
  const { email } = req.body;
  
  const emaildominio = email.split('@')[1];
  if(emaildominio !== 'neurospine.com') {
    return res.status(400).json({msg: 'Correo no valido, debe ser de la empresa Neurospine.com'});
  }

  const existeEmail = await Usuario.findOne({ email });

  
  console.log(emaildominio);
  console.log(existeEmail);

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

export { registro, login, perfil };