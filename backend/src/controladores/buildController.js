import {
  obtenerTodasBuilds,
  obtenerBuildPorIdData,
  crearBuildData,
  actualizarBuildData,
  eliminarBuildData,
} from "../data/buildData.js";

export async function obtenerBuilds(req, res) {
  const builds = await obtenerTodasBuilds();

  res.json(builds);
}

export async function obtenerBuildPorId(req, res) {
  const id = Number(req.params.id);

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
    objeto,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol,
    descripcion,
  } = req.body;

  if (
    !pokemon_id ||
    !titulo ||
    !objeto ||
    !movimiento_1 ||
    !movimiento_2 ||
    !movimiento_3 ||
    !movimiento_4 ||
    !rol
  ) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios para crear la build.",
    });
  }

  const nuevaBuild = {
    pokemon_id,
    titulo,
    objeto,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol,
    descripcion: descripcion || null,
  };

  const id = await crearBuildData(nuevaBuild);

  res.status(201).json({
    id,
    ...nuevaBuild,
  });
}

export async function actualizarBuild(req, res) {
  const id = Number(req.params.id);

  const {
    pokemon_id,
    titulo,
    objeto,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol,
    descripcion,
  } = req.body;

  if (
    !pokemon_id ||
    !titulo ||
    !objeto ||
    !movimiento_1 ||
    !movimiento_2 ||
    !movimiento_3 ||
    !movimiento_4 ||
    !rol
  ) {
    return res.status(400).json({
      mensaje: "Faltan campos obligatorios para actualizar la build.",
    });
  }

  const buildActualizada = {
    pokemon_id,
    titulo,
    objeto,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol,
    descripcion: descripcion || null,
  };

  const filasActualizadas = await actualizarBuildData(
    id,
    buildActualizada
  );

  if (filasActualizadas === 0) {
    return res.status(404).json({
      mensaje: "Build no encontrada.",
    });
  }

  res.json({
    id,
    ...buildActualizada,
  });
}

export async function eliminarBuild(req, res) {
  const id = Number(req.params.id);

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
