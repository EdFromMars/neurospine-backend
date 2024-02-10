import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";

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
  puesto: {
    type: String,
    required: false,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
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