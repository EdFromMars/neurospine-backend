import checkAuth from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

import {
  agregarProgramacion,
  obtenerProgramaciones,
  obtenerProgramacion,
  actualizarProgramacion,
  eliminarProgramacion
} from "../controllers/programacionController.js";

router.route("/")
  .post(checkAuth, agregarProgramacion)
  .get(checkAuth, obtenerProgramaciones);

router
  .route("/:id")
  .get(checkAuth, obtenerProgramacion)
  .put(checkAuth, actualizarProgramacion)
  .delete(checkAuth, eliminarProgramacion);

export default router;