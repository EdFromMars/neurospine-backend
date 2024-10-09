import checkAuth from "../middleware/authMiddleware.js";
import express from "express";
import Usuario from "../models/Usuario.js";

import {
  obtenerUsuarios
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", checkAuth, obtenerUsuarios);

export default router;