import mongoose from "mongoose";
import Zonas from "./Zonas.js";

const hospitalSchema = new mongoose.Schema({
  zona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zonas",
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;