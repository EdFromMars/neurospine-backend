import checkAuth from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

import {
  agregarMaterialApoyo,
  obtenerMaterialesApoyo,
  obtenerMaterialApoyo,
  actualizarMaterialApoyo,
  eliminarMaterialApoyo,
} from "../controllers/materialApoyoController.js";

router.route("/")
  .post(checkAuth, agregarMaterialApoyo)
  .get(checkAuth, obtenerMaterialesApoyo);

router
  .route("/:id")
  .get(checkAuth, obtenerMaterialApoyo)
  .put(checkAuth, actualizarMaterialApoyo)
  .delete(checkAuth, eliminarMaterialApoyo);

export default router;