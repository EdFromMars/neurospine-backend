import mongoose from "mongoose";
import MaterialApoyo from "./MaterialApoyo.js";
import Usuario from "./Usuario.js";
import Locaciones from "./Locaciones.js";

const PiezasMaterialApoyoSchema = new mongoose.Schema({
  nombrePieza: {
    type: String,
    required: true,
    trim: true,
  },
  materialApoyo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaterialApoyo",
    required: true,
  },
  piezasPorSet: {
    type: Number,
    required: true,
  },
  locacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locaciones",
    required: true,
  },
  precioAngeles: {
    type: Number,
    required: false,
  },
  precioEstandar: {
    type: Number,
    required: false,
  },
  precioRentaAngeles: {
    type: Number,
    required: false,
  },
  precioRentaEstandar: {
    type: Number,
    required: false,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const PiezasMaterialApoyo = mongoose.model("PiezasMaterialApoyo", PiezasMaterialApoyoSchema);

export default PiezasMaterialApoyo;
