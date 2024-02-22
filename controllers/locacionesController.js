import Locaciones from "../models/Locaciones.js";

const agregarLocacion = async (req, res) => {
  const locacion = new Locaciones(req.body);
  
  try {
    const locacionGuardada = await locacion.save();
    res.json(locacionGuardada);
  } catch (error) {
    console.log(error);
  }
}

const obtenerLocaciones = async (req, res) => {
  try {
    const locaciones = await Locaciones.find();
    res.json(locaciones);
  } catch (error) {
    console.log(error);
  }
}

const obtenerLocacion = async (req, res) => {
  const { id } = req.params;
  const locacion = await Locaciones.findById(id);

  if(!locacion) {
    return res.status(404).json({ msg: 'Locacion no encontrada' });
  }

  res.json(locacion);
}


const actualizarLocacion = async (req, res) => {
  const { id } = req.params;
  const locacion = await Locaciones.findById(id);

  if(!locacion) {
    return res.status(404).json({ msg: 'Locacion no encontrada' });
  }

  locacion.usuario = req.body.usuario || locacion.usuario;
  locacion.nombre = req.body.nombre || locacion.nombre;

  try {
    const locacionActualizada = await locacion.save();
    res.json(locacionActualizada);
  } catch (error) {
    console.log(error);
  }
}

const eliminarLocacion = async (req, res) => {
  const { id } = req.params;
  const locacion = await Locaciones.findById(id);

  if(!locacion) {
    return res.status(404).json({ msg: 'Locacion no encontrada' });
  }

  try {
    await locacion.deleteOne();
    res.json({ msg: 'Locacion eliminada' });
  } catch (error) {
    console.log(error);
  }
}

export {
  agregarLocacion,
  obtenerLocaciones,
  obtenerLocacion,
  actualizarLocacion,
  eliminarLocacion
}