import MaterialApoyo from "../models/MaterialApoyo.js";

const agregarMaterialApoyo = async (req, res) => {
  const materialApoyo = new MaterialApoyo(req.body);
  
  try {
    const materialApoyoGuardado = await materialApoyo.save();
    res.json(materialApoyoGuardado);
  } catch (error) {
    console.log(error);
  }
}

const obtenerMaterialesApoyo = async (req, res) => {
  const materialApoyo = await MaterialApoyo.find({});
  res.json(materialApoyo);
}

const obtenerMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const materialApoyo = await MaterialApoyo.findById(id);

  if(!materialApoyo) {
    return res.status(404).json({ msg: 'Material de Apoyo no encontrado' });
  }

  if(materialApoyo._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  res.json(materialApoyo);
}

const actualizarMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const materialApoyo = await MaterialApoyo.findById(id);

  if(!materialApoyo) {
    return res.status(404).json({ msg: 'Material de Apoyo no encontrado' });
  }

  if(materialApoyo._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  //Actualizar Material de Apoyo
  materialApoyo.nombre = req.body.nombre || materialApoyo.nombre;
  materialApoyo.descripcionExtendida = req.body.descripcionExtendida || materialApoyo.descripcionExtendida;
  materialApoyo.existencias = req.body.existencias || materialApoyo.existencias;
  materialApoyo.alg = req.body.alg || materialApoyo.alg;
  materialApoyo.precioAngeles = req.body.precioAngeles || materialApoyo.precioAngeles;
  materialApoyo.precioEstandar = req.body.precioEstandar || materialApoyo.precioEstandar;
  materialApoyo.locacion = req.body.locacion || materialApoyo.locacion;

  const materialApoyoActualizado = await materialApoyo.save();
  res.json(materialApoyoActualizado);
}

const eliminarMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const materialApoyo = await MaterialApoyo.findById(id);

  if(!materialApoyo) {
    return res.status(404).json({ msg: 'Material de Apoyo no encontrado' });
  }

  if(materialApoyo._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  await materialApoyo.remove();
  res.json({ msg: 'Material de Apoyo eliminado' });
}

export {
  agregarMaterialApoyo,
  obtenerMaterialesApoyo,
  obtenerMaterialApoyo,
  actualizarMaterialApoyo,
  eliminarMaterialApoyo
};