import {
  obtenerTodosPokemons,
  obtenerPokemonPorIdData,
  crearPokemonData,
  actualizarPokemonData,
  eliminarPokemonData,
} from "../data/pokemonData.js";

export async function obtenerPokemons(req, res) {
  const buscar = req.query.buscar || "";

  const pokemons = await obtenerTodosPokemons(buscar);

  res.json(pokemons);
}

export async function obtenerPokemonPorId(req, res) {
  const id = Number(req.params.id);

  const pokemon = await obtenerPokemonPorIdData(id);

  if (!pokemon) {
    return res.status(404).json({
      mensaje: "Pokémon no encontrado amorch.",
    });
  }

  res.json(pokemon);
}

export async function crearPokemon(req, res) {
  const { id, nombre } = req.body;

  if (!id || !nombre) {
    return res.status(400).json({
      mensaje: "El id y el nombre son obligatorios.",
    });
  }

  await crearPokemonData(id, nombre);

  res.status(201).json({
    id: id,
    nombre: nombre,
  });
}

export async function actualizarPokemon(req, res) {
  const id = Number(req.params.id);
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({
      mensaje: "El nombre es obligatorio.",
    });
  }

  const filasActualizadas = await actualizarPokemonData(id, nombre);

  if (filasActualizadas === 0) {
    return res.status(404).json({
      mensaje: "Pokémon no encontrado amorch.",
    });
  }

  res.json({
    id: id,
    nombre: nombre,
  });
}

export async function eliminarPokemon(req, res) {
  const id = Number(req.params.id);

  const filasEliminadas = await eliminarPokemonData(id);

  if (filasEliminadas === 0) {
    return res.status(404).json({
      mensaje: "Pokémon no encontrado amorch.",
    });
  }

  res.json({
    mensaje: "Pokémon eliminado correctamente.",
    id: id,
  });
}
