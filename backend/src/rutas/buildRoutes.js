import express from "express";
import {
  obtenerBuilds,
  obtenerBuildPorId,
  crearBuild,
  actualizarBuild,
} from "../controladores/buildController.js";
import { apiKeyAuth } from "../middlewares/apiKeyAuth.js";

const router = express.Router();

router.get("/", obtenerBuilds);
router.post("/", apiKeyAuth, crearBuild);
router.get("/:id", obtenerBuildPorId);
router.put("/:id", apiKeyAuth, actualizarBuild);

export default router;
