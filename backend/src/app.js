import express from "express";
import cors from "cors";
import roleRoutes from "./rutas/roleRoutes.js";
import pokemonRoutes from "./rutas/pokemonRoutes.js";
import buildRoutes from "./rutas/buildRoutes.js";
import itemRoutes from "./rutas/itemRoutes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Pokemon Trainer Hub funcionando ;)",
    });
});

app.use("/pokemon", pokemonRoutes);
app.use("/builds", buildRoutes);
app.use("/items", itemRoutes);
app.use("/roles", roleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor Backend funcionando en http://localhost:${PORT}`)
});
