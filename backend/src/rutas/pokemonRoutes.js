import express from "express";
import {
  obtenerPokemons,
  obtenerPokemonPorId,
  crearPokemon,
  actualizarPokemon,
  eliminarPokemon,
} from "../controladores/pokemonController.js";

const router = express.Router();

router.get("/", obtenerPokemons);
router.post("/", crearPokemon);
router.get("/:id", obtenerPokemonPorId);
router.put("/:id", actualizarPokemon);
router.delete("/:id", eliminarPokemon);

export default router;