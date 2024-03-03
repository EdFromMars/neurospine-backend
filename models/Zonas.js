import mongoose from "mongoose";
import Locaciones from "./Locaciones.js";
import Usuario from "./Usuario.js";

const zonasSchema = new mongoose.Schema({
  nombreZona: {
    type: String,
    required: true,
    trim: true,
  },
  locacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locaciones",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

const Zonas = mongoose.model("Zonas", zonasSchema);

export default Zonas;