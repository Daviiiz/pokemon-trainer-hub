import "dotenv/config";
import express from "express";
import cors from "cors";

import buildRoutes from "./rutas/buildRoutes.js";
import itemRoutes from "./rutas/itemRoutes.js";
import roleRoutes from "./rutas/roleRoutes.js";

import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

const PORT = Number(process.env.PORT) || 3000;

const allowedOrigins = [
  "http://localhost:4321",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Pokemon Trainer Hub funcionando ;)",
  });
});

app.use("/builds", buildRoutes);
app.use("/items", itemRoutes);
app.use("/roles", roleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor Backend funcionando en http://localhost:${PORT}`);
});
