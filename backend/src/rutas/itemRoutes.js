import express from "express";
import {
  obtenerItems,
  obtenerItemPorId,
} from "../controladores/itemController.js";

const router = express.Router();

router.get("/", obtenerItems);
router.get("/:id", obtenerItemPorId);

export default router;
