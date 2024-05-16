import RazonSocial from "../models/RazonSocial.js";

const agregarRazonSocial = async (req, res) => {
  const razonSocial = new RazonSocial(req.body);

  try {
    const razonSocialGuardado = await razonSocial.save();
    res.json(razonSocialGuardado);
  } catch (error) {
    console.log(error);
  }
}

const obtenerRazonesSociales = async (req, res) => {
  const razonSocial = await RazonSocial.find({});
  res.json(razonSocial);
}

const obtenerRazonSocial = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const razonSocial = await RazonSocial.findById(id);

  if(!razonSocial) {
    return res.status(404).json({ msg: 'Razón Social no encontrado' });
  }

  if(razonSocial._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  res.json(razonSocial);
}

const actualizarRazonSocial = async (req, res) => {
  const { id } = req.params;
  const razonSocial = await RazonSocial.findById(id);

  if(!razonSocial) {
    return res.status(404).json({ msg: 'Razón Social no encontrado' });
  }

  if(razonSocial._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  razonSocial.nombre = req.body.nombre || razonSocial.nombre;
  razonSocial.rfc = req.body.rfc || razonSocial.rfc;
  razonSocial.direccion = req.body.direccion || razonSocial.direccion;
  razonSocial.telefono = req.body.telefono || razonSocial.telefono;
  razonSocial.email = req.body.email || razonSocial.email;
  razonSocial.activo = req.body.activo || razonSocial.activo;

  const razonSocialActualizado = await razonSocial.save();
  res.json(razonSocialActualizado);
}

const eliminarRazonSocial = async (req, res) => {
  const { id } = req.params;
  const razonSocial = await RazonSocial.findById(id);

  if(!razonSocial) {
    return res.status(404).json({ msg: 'Razón Social no encontrado' });
  }

  if(razonSocial._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  await RazonSocial.findByIdAndDelete(id);
  res.json({ msg: 'Razón Social eliminado' });
}

export {
  agregarRazonSocial,
  obtenerRazonesSociales,
  obtenerRazonSocial,
  actualizarRazonSocial,
  eliminarRazonSocial,
};