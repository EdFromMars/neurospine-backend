import checkAuth from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

import {
  agregarRazonSocial,
  obtenerRazonesSociales,
  obtenerRazonSocial,
  actualizarRazonSocial,
  eliminarRazonSocial
} from "../controllers/razonSocialController.js";

router.route("/")
  .post(checkAuth, agregarRazonSocial)
  .get(checkAuth, obtenerRazonesSociales);

router
  .route("/:id")
  .get(checkAuth, obtenerRazonSocial)
  .put(checkAuth, actualizarRazonSocial)
  .delete(checkAuth, eliminarRazonSocial);

export default router;