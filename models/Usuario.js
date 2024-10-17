import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";
import Locaciones from "./Locaciones.js";

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: false,
    trim: true,
  },
  puesto: {
    type: String,
    required: false,
    default: null,
  },
  locacion: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "Locaciones",
    required: false,
  },
  zonas: {
    type: Array,
    trim: true,
    required: false,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  documentos: {
    type: Array,
    required: false,
  },
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  next();
});

UsuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;