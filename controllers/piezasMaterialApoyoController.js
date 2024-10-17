import PiezasMaterialApoyo from "../models/PiezasMaterialApoyo.js";

const agregarPiezaMaterialApoyo = async (req, res) => {
  const piezaMaterialApoyo = new PiezasMaterialApoyo(req.body);
  
  try {
    const piezaMaterialApoyoGuardada = await piezaMaterialApoyo.save();
    res.json(piezaMaterialApoyoGuardada);
  } catch (error) {
    console.log(error);
  }
}

const obtenerPiezasMaterialApoyo = async (req, res) => {
  const piezasMaterialApoyo = await PiezasMaterialApoyo.find({});
  res.json(piezasMaterialApoyo);
}

const obtenerPiezaMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const piezaMaterialApoyo = await PiezasMaterialApoyo.findById(id);

  if(!piezaMaterialApoyo) {
    return res.status(404).json({ msg: 'Pieza de Material de Apoyo no encontrada' });
  }

  if(piezaMaterialApoyo._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  res.json(piezaMaterialApoyo);
}

const actualizarPiezaMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const piezaMaterialApoyo = await PiezasMaterialApoyo.findById(id);

  if(!piezaMaterialApoyo) {
    return res.status(404).json({ msg: 'Pieza de Material de Apoyo no encontrada' });
  }

  if(piezaMaterialApoyo._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  //Actualizar Pieza de Material de Apoyo
  piezaMaterialApoyo.nombrePieza = req.body.nombrePieza || piezaMaterialApoyo.nombrePieza;
  piezaMaterialApoyo.materialApoyo = req.body.materialApoyo || piezaMaterialApoyo.materialApoyo;
  piezaMaterialApoyo.piezasPorSet = req.body.piezasPorSet || piezaMaterialApoyo.piezasPorSet;
  piezaMaterialApoyo.locacion = req.body.locacion || piezaMaterialApoyo.locacion;
  piezaMaterialApoyo.precioAngeles = req.body.precioAngeles || piezaMaterialApoyo.precioAngeles;
  piezaMaterialApoyo.precioEstandar = req.body.precioEstandar || piezaMaterialApoyo.precioEstandar;
  piezaMaterialApoyo.precioRentaAngeles = req.body.precioRentaAngeles || piezaMaterialApoyo.precioRentaAngeles;
  piezaMaterialApoyo.precioRentaEstandar = req.body.precioRentaEstandar || piezaMaterialApoyo.precioRentaEstandar;

  try {
    const piezaMaterialApoyoActualizada = await piezaMaterialApoyo.save();
    res.json(piezaMaterialApoyoActualizada);
  } catch (error) {
    console.log(error);
  }
}

const eliminarPiezaMaterialApoyo = async (req, res) => {
  const { id } = req.params;
  const piezaMaterialApoyo = await PiezasMaterialApoyo.findById(id);

  if(!piezaMaterialApoyo) {
    return res.status(404).json({ msg: 'Pieza de Material de Apoyo no encontrada' });
  }

  try {
    await piezaMaterialApoyo.deleteOne({ _id: id });
    res.json({ msg: 'Pieza de Material de Apoyo eliminada' });
  } catch (error) {
    console.log(error);
  }
}

export {
  agregarPiezaMaterialApoyo,  
  obtenerPiezasMaterialApoyo,
  obtenerPiezaMaterialApoyo,
  actualizarPiezaMaterialApoyo,
  eliminarPiezaMaterialApoyo
}



