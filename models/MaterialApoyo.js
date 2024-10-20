import mongoose from "mongoose";
import Locaciones from "./Locaciones.js";
import Usuario from "./Usuario.js";

const MaterialApoyoSchema = new mongoose.Schema({
  nombreMaterial: {
    type: String,
    required: true,
    trim: true,
  },
  descripcionExtendida: {
    type: String,
    required: true,
    trim: true,
  },
  existencias: {
    type: Number,
    required: true,
  },
  alg: {
    type: String,
    required: true,
    trim: true,
  },
  precioAngeles: {
    type: Number,
    required: false,
  },
  precioEstandar: {
    type: Number,
    required: false,
  },
  precioRentaAngeles: {
    type: Number,
    required: false,
  },
  precioRentaEstandar: {
    type: Number,
    required: false,
  },
  locacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locaciones",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const MaterialApoyo = mongoose.model("MaterialApoyo", MaterialApoyoSchema);

export default MaterialApoyo;