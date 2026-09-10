import db from "../config/db.js";

const SELECT_BUILDS = `
  SELECT
    builds.id,
    builds.pokemon_id,
    builds.titulo,
    COALESCE(items.nombre, builds.objeto) AS objeto,
    builds.movimiento_1,
    builds.movimiento_2,
    builds.movimiento_3,
    builds.movimiento_4,
    COALESCE(roles.nombre, builds.rol) AS rol,
    builds.descripcion,
    builds.item_id,
    builds.role_id
  FROM builds
  LEFT JOIN items
    ON builds.item_id = items.id
  LEFT JOIN roles
    ON builds.role_id = roles.id
`;

export async function obtenerTodasBuilds(pokemonId = null) {
  if (pokemonId) {
    const [filas] = await db.execute(
      `${SELECT_BUILDS}
       WHERE builds.pokemon_id = ?
       ORDER BY builds.id`,
      [pokemonId]
    );

    return filas;
  }

  const [filas] = await db.query(
    `${SELECT_BUILDS}
     ORDER BY builds.id`
  );

  return filas;
}

export async function obtenerBuildPorIdData(id) {
  const [filas] = await db.execute(
    `${SELECT_BUILDS}
     WHERE builds.id = ?`,
    [id]
  );

  return filas[0];
}

export async function crearBuildData(build) {
  const {
    pokemon_id,
    titulo,
    objeto = null,
    item_id = null,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol = null,
    role_id = null,
    descripcion,
  } = build;

  const [resultado] = await db.execute(
    `INSERT INTO builds (
      pokemon_id,
      titulo,
      objeto,
      item_id,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
      role_id,
      descripcion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      pokemon_id,
      titulo,
      objeto,
      item_id,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
      role_id,
      descripcion,
    ]
  );

  return resultado.insertId;
}

export async function actualizarBuildData(id, build) {
  const {
    pokemon_id,
    titulo,
    objeto = null,
    item_id = null,
    movimiento_1,
    movimiento_2,
    movimiento_3,
    movimiento_4,
    rol = null,
    role_id = null,
    descripcion,
  } = build;

  const [resultado] = await db.execute(
    `UPDATE builds
     SET pokemon_id = ?,
         titulo = ?,
         objeto = ?,
         item_id = ?,
         movimiento_1 = ?,
         movimiento_2 = ?,
         movimiento_3 = ?,
         movimiento_4 = ?,
         rol = ?,
         role_id = ?,
         descripcion = ?
     WHERE id = ?`,
    [
      pokemon_id,
      titulo,
      objeto,
      item_id,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
      role_id,
      descripcion,
      id,
    ]
  );

  return resultado.affectedRows;
}

export async function eliminarBuildData(id) {
  const [resultado] = await db.execute(
    "DELETE FROM builds WHERE id = ?",
    [id]
  );

  return resultado.affectedRows;
}
