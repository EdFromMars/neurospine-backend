import mongoose from "mongoose";
import Hospital from "./Hospital.js";

const doctorSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  nombreDoctor: {
    type: String,
    required: true,
    trim: true,
  },
  consultorio: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  telefono: {
    type: Number,
    required: true,
    trim: true,
  },
  comentarios: {
    type: String,
    required: false,
    trim: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;