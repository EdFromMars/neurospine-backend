import Zonas from "../models/Zonas.js";

const agregarZona = async (req, res) => {
  const zona = new Zonas(req.body);
  
  try {
    const zonaGuardada = await zona.save();
    res.json(zonaGuardada);
  } catch (error) {
    console.log(error);
  }
}

const obtenerZonas = async (req, res) => {
  try {
    const zonas = await Zonas.find();
    res.json(zonas);
  } catch (error) {
    console.log(error);
  }
}

const obtenerZona = async (req, res) => {
  const { id } = req.params;
  const zona = await Zonas.findById(id);

  if(!zona) {
    return res.status(404).json({ msg: 'Zona no encontrada' });
  }

  res.json(zona);
}

const actualizarZona = async (req, res) => {
  const { id } = req.params;
  const zona = await Zonas.findById(id);

  if(!zona) {
    return res.status(404).json({ msg: 'Zona no encontrada' });
  }

  zona.usuario = req.body.usuario || zona.usuario;
  zona.nombreZona = req.body.nombreZona || zona.nombreZona;
  zona.locacion = req.body.locacion || zona.locacion;

  try {
    const zonaActualizada = await zona.save();
    res.json(zonaActualizada);
  } catch (error) {
    console.log(error);
  }
}

const eliminarZona = async (req, res) => {
  const { id } = req.params;
  const zona = await Zonas.findById(id);

  if(!zona) {
    return res.status(404).json({ msg: 'Zona no encontrada' });
  }

  await Zonas.findByIdAndDelete(id);
  res.json({ msg: 'Zona eliminada' });
}

export {
  agregarZona,
  obtenerZonas,
  obtenerZona,
  actualizarZona,
  eliminarZona
}