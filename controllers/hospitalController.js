import Hospital from "../models/Hospital.js";

const agregarHospital = async (req, res) => {
  const hospital = new Hospital(req.body);
  
  try {
    const hospitalGuardado = await hospital.save();
    res.json(hospitalGuardado);
  } catch (error) {
    console.log(error);
  }
}

const obtenerHospitales = async (req, res) => {
  try {
    const hospitales = await Hospital.find();
    res.json(hospitales);
  } catch (error) {
    console.log(error);
  }
}

const obtenerHospital = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findById(id);

  if(!hospital) {
    return res.status(404).json({ msg: 'Hospital no encontrado' });
  }

  res.json(hospital);
}

const actualizarHospital = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findById(id);

  if(!hospital) {
    return res.status(404).json({ msg: 'Hospital no encontrado' });
  }

  hospital.zona = req.body.zona || hospital.zona;
  hospital.nombre = req.body.nombre || hospital.nombre;

  try {
    const hospitalActualizado = await hospital.save();
    res.json(hospitalActualizado);
  } catch (error) {
    console.log(error);
  }
}

const eliminarHospital = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findById(id);

  if(!hospital) {
    return res.status(404).json({ msg: 'Hospital no encontrado' });
  }

  await hospital.remove();
  res.json({ msg: 'Hospital eliminado' });
}

export {
  agregarHospital,
  obtenerHospitales,
  obtenerHospital,
  actualizarHospital,
  eliminarHospital,
};