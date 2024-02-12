import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    trim: true,
  },
  material_apoyo: {
    type: Boolean,
    required: true,
    trim: true,
    default: false,
  },
  descripcion_extendida: {
    type: String,
    required: true,
    trim: true,
  },
  cantidad_min: {
    type: Number,
    required: true,
  },
  cantidad_max: {
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
  precio_ga: {
    type: Number,
    required: true,
  },
  precio_default: {
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