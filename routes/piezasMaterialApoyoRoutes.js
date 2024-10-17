import checkAuth from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

import {
  agregarPiezaMaterialApoyo,
  obtenerPiezasMaterialApoyo,
  obtenerPiezaMaterialApoyo,
  actualizarPiezaMaterialApoyo,
  eliminarPiezaMaterialApoyo
} from "../controllers/piezasMaterialApoyoController.js";

router.route("/")
  .post(checkAuth, agregarPiezaMaterialApoyo)
  .get(checkAuth, obtenerPiezasMaterialApoyo);

router
  .route("/:id")
  .get(checkAuth, obtenerPiezaMaterialApoyo)
  .put(checkAuth, actualizarPiezaMaterialApoyo)
  .delete(checkAuth, eliminarPiezaMaterialApoyo);

export default router;
