import Doctor from "../models/Doctor.js";

const agregarDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  
  try {
    const doctorGuardado = await doctor.save();
    res.json(doctorGuardado);
  } catch (error) {
    console.log(error);
  }
}

const obtenerDoctores = async (req, res) => {
  let hospital = req.query.hospital;
  try {
    const doctores = await Doctor.find(hospital ? { hospital } : {});
    res.json(doctores);
  } catch (error) {
    console.log(error);
  }
}

const obtenerDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);

  if(!doctor) {
    return res.status(404).json({ msg: 'Doctor no encontrado' });
  }

  res.json(doctor);
}

const actualizarDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);

  if(!doctor) {
    return res.status(404).json({ msg: 'Doctor no encontrado' });
  }

  doctor.hospital = req.body.hospital || doctor.hospital;
  doctor.nombreDoctor = req.body.nombreDoctor || doctor.nombreDoctor;
  doctor.consultorio = req.body.consultorio || doctor.consultorio;
  doctor.email = req.body.email || doctor.email;
  doctor.telefono = req.body.telefono || doctor.telefono;
  doctor.comentarios = req.body.comentarios || doctor.comentarios;

  try {
    const doctorActualizado = await doctor.save();
    res.json(doctorActualizado);
  } catch (error) {
    console.log(error);
  }
}

const eliminarDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);

  if(!doctor) {
    return res.status(404).json({ msg: 'Doctor no encontrado' });
  }

  await doctor.remove();
  res.json({ msg: 'Doctor eliminado' });
}

export {
  agregarDoctor,
  obtenerDoctores,
  obtenerDoctor,
  actualizarDoctor,
  eliminarDoctor,
}