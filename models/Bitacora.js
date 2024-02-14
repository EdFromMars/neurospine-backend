import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const bitacoraSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  acciones: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Bitacora = mongoose.model("Bitacora", bitacoraSchema);

export default Bitacora;