import mongoose from "mongoose";

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
    default: "Vendedor",
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;