import mongoose from "mongoose";
import Usuario from "./Usuario.js";

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
    required: true,
    trim: true,
  },
  alg: {
    type: String,
    required: true,
    trim: true,
  },
  precioAngeles: {
    type: Number,
    required: true,
  },
  precioEstandar: {
    type: Number,
    required: true,
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

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;