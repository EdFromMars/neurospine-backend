import Programacion from "../models/Programacion.js";

const agregarProgramacion = async (req, res) => {
  const programacion = new Programacion(req.body);
  
  try {
    const programacionGuardada = await programacion.save();
    res.json(programacionGuardada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProgramaciones = async (req, res) => {
  const programaciones = await Programacion.find({});
  res.json(programaciones);
};

const obtenerProgramacion = async (req, res) => {
  const { id } = req.params;
  const programacion = await Programacion.findById(id);

  if(!programacion) {
    return res.status(404).json({ msg: 'Programacion no encontrada' });
  }

  if(programacion._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  res.json(programacion);
}

const actualizarProgramacion = async (req, res) => {
  const { id } = req.params;
  const programacion = await Programacion.findById(id);

  if(!programacion) {
    return res.status(404).json({ msg: 'Programacion no encontrada' });
  }

  if(programacion._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  //Actualizar Programacion
  programacion.razonSocial = req.body.razonSocial || programacion.razonSocial;
  programacion.tipoProgramacion = req.body.tipoProgramacion || programacion.tipoProgramacion;
  programacion.tipoCirugia = req.body.tipoCirugia || programacion.tipoCirugia;
  programacion.tipoVenta = req.body.tipoVenta || programacion.tipoVenta;
  programacion.formaPago = req.body.formaPago || programacion.formaPago;
  programacion.fechaCirugia = req.body.fechaCirugia || programacion.fechaCirugia;
  programacion.horaCirugia = req.body.horaCirugia || programacion.horaCirugia;
  programacion.fechaEntrega = req.body.fechaEntrega || programacion.fechaEntrega;
  programacion.fechaDevolucion = req.body.fechaDevolucion || programacion.fechaDevolucion;
  programacion.hospital = req.body.hospital || programacion.hospital;
  programacion.estado = req.body.estado || programacion.estado;
  programacion.nombrePaciente = req.body.nombrePaciente || programacion.nombrePaciente;
  programacion.nombreCirujano = req.body.nombreCirujano || programacion.nombreCirujano;
  programacion.responsableMaterial = req.body.responsableMaterial || programacion.responsableMaterial;
  programacion.empresaResponsable = req.body.empresaResponsable || programacion.empresaResponsable;
  programacion.observaciones = req.body.observaciones || programacion.observaciones;
  programacion.productos = req.body.productos || programacion.productos;
  programacion.materialApoyo = req.body.materialApoyo || programacion.materialApoyo;
  programacion.usuario = req.body.usuario || programacion.usuario;
}

const eliminarProgramacion = async (req, res) => {
  const { id } = req.params;
  const programacion = await Programacion.findById(id);

  if(!programacion) {
    return res.status(404).json({ msg: 'Programacion no encontrada' });
  }

  try {
    await programacion.remove();
    res.json({ msg: 'Programacion eliminada' });
  } catch (error) {
    console.log(error);
  } 
}

export {
  agregarProgramacion,
  obtenerProgramaciones,
  obtenerProgramacion,
  actualizarProgramacion,
  eliminarProgramacion,
};