import {
  obtenerTodasBuilds,
  obtenerBuildPorIdData,
  crearBuildData,
  actualizarBuildData,
  eliminarBuildData,
} from "../data/buildData.js";

export async function obtenerBuilds(req, res) {
  const pokemonId = req.query.pokemon_id
    ? Number(req.query.pokemon_id)
    : null;

  if (
    req.query.pokemon_id &&
    (!Number.isInteger(pokemonId) || pokemonId <= 0)
  ) {
    return res.status(400).json({
      mensaje: "pokemon_id debe ser un número entero positivo.",
    });
  }

  const builds = await obtenerTodasBuilds(pokemonId);

  res.json(builds);
}

export async function obtenerBuildPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El id de la Build debe ser un número entero positivo.",
    });
  }

  const build = await obtenerBuildPorIdData(id);

  if (!build) {
    return res.status(404).json({
      mensaje: "Build no encontrada.",
    });
  }

  res.json(build);
}

export async function crearBuild(req, res) {
  const {
    pokemon_id,
    titulo,
    item_id,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    role_id,
    descripcion,
  } = req.body;

  const pokemonId = Number(pokemon_id);
  const itemId = Number(item_id);
  const roleId = Number(role_id);

  if (
    !titulo ||
    !movimiento_1 ||
    !movimiento_2 ||
    !movimiento_3 ||
    !movimiento_4
  ) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios para crear la Build.",
    });
  }

  if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
    return res.status(400).json({
      mensaje: "pokemon_id debe ser un número entero positivo.",
    });
  }

  if (!Number.isInteger(itemId) || itemId <= 0) {
    return res.status(400).json({
      mensaje: "item_id debe ser un número entero positivo.",
    });
  }

  if (!Number.isInteger(roleId) || roleId <= 0) {
    return res.status(400).json({
      mensaje: "role_id debe ser un número entero positivo.",
    });
  }

  const nuevaBuild = {
    pokemon_id: pokemonId,
    titulo,
    item_id: itemId,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    role_id: roleId,
    descripcion: descripcion || null,
  };

  const id = await crearBuildData(nuevaBuild);

  const buildCreada = await obtenerBuildPorIdData(id);

  res.status(201).json(buildCreada);
}

export async function actualizarBuild(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El id de la Build debe ser un número entero positivo.",
    });
  }

  const buildExistente = await obtenerBuildPorIdData(id);

  if (!buildExistente) {
    return res.status(404).json({
      mensaje: "Build no encontrada.",
    });
  }

  const {
    pokemon_id,
    titulo,
    item_id,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    role_id,
    descripcion,
  } = req.body;

  const pokemonId = Number(pokemon_id);
  const itemId = Number(item_id);
  const roleId = Number(role_id);

  if (
    !titulo ||
    !movimiento_1 ||
    !movimiento_2 ||
    !movimiento_3 ||
    !movimiento_4
  ) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios para actualizar la Build.",
    });
  }

  if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
    return res.status(400).json({
      mensaje: "pokemon_id debe ser un número entero positivo.",
    });
  }

  if (!Number.isInteger(itemId) || itemId <= 0) {
    return res.status(400).json({
      mensaje: "item_id debe ser un número entero positivo.",
    });
  }

  if (!Number.isInteger(roleId) || roleId <= 0) {
    return res.status(400).json({
      mensaje: "role_id debe ser un número entero positivo.",
    });
  }

  const buildActualizada = {
    pokemon_id: pokemonId,
    titulo,
    item_id: itemId,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    role_id: roleId,
    descripcion: descripcion || null,
  };

  await actualizarBuildData(
    id,
    buildActualizada
  );

  const buildFinal = await obtenerBuildPorIdData(id);

  res.json(buildFinal);
}

export async function eliminarBuild(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El id de la Build debe ser un número entero positivo.",
    });
  }

  const filasEliminadas = await eliminarBuildData(id);

  if (filasEliminadas === 0) {
    return res.status(404).json({
      mensaje: "Build no encontrada.",
    });
  }

  res.json({
    mensaje: "Build eliminada correctamente.",
    id,
  });
}
