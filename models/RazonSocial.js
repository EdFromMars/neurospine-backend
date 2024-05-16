import mongoose, { mongo } from "mongoose";

const razonSocialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  rfc: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const RazonSocial = mongoose.model("RazonSocial", razonSocialSchema);

export default RazonSocial;