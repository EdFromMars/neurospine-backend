import mongoose, { mongo } from "mongoose";
import Usuario from "./Usuario.js";
import Locaciones from "./Locaciones.js";

const productoSchema = new mongoose.Schema({
  nombreMaterial: {
    type: String,
    required: true,
    trim: true,
  },
  tipoMaterial: {
    type: String,
    required: true,
    trim: true,
  },
  materialApoyo: {
    type: Boolean,
    required: true,
    trim: true,
    default: false,
  },
  descripcionExtendida: {
    type: String,
    required: true,
    trim: true,
  },
  cantidadMin: {
    type: Number,
    required: true,
  },
  cantidadMax: {
    type: Number,
    required: true,
  },
  existencias: {
    type: Number,
    required: true,
  },
  medida: {
    type: String,
    required: false,
    trim: true,
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
  materialPrincipal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  locacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locaciones",
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;