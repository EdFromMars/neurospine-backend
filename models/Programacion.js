import mongoose from "mongoose";
import RazonSocial from "./RazonSocial.js";
import Usuario from "./Usuario.js";
import Hospital from "./Hospital.js";

const programacionSchema = new mongoose.Schema({
  razonSocial: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  tipoProgramacion: {
    type: String,
    required: true,
    trim: true,
  },
  tipoCirugia: {
    type: String,
    required: true,
    trim: true,
  },
  tipoVenta: {
    type: String,
    required: true,
    trim: true,
  },
  formaPago: {
    type: String,
    required: true,
    trim: true,
  },
  fechaCirugia: {
    type: String,
    required: true,
  },
  horaCirugia: {
    type: String,
    required: true,
    trim: true,
  },
  fechaEntrega: {
    type: String,
    required: true,
  },
  fechaDevolucion: {
    type: String,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  estado: {
    type: Number,
    required: true,
  },
  nombrePaciente: {
    type: String,
    required: true,
    trim: true,
  },
  nombreCirujano: {
    type: String,
    required: true,
    trim: true,
  },
  responsableMaterial: {
    type: String,
    required: true,
    trim: true,
  },
  empresaResponsable: {
    type: String,
    required: true,
    trim: true,
  },
  observaciones: {
    type: String,
    required: false,
    trim: true,
  },
  productos: {
    type: String,
    required: true,
    trim: true,
  },
  materialApoyo: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const ProgramacionModel = mongoose.model("Programacion", programacionSchema);

export default ProgramacionModel;