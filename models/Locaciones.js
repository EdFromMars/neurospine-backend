import mongoose from "mongoose";
import Usuario from "./Usuario.js";

const locacionesSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
});

const Locaciones = mongoose.model("Locaciones", locacionesSchema);

export default Locaciones;