import db from "../config/db.js";

export async function obtenerTodasBuilds() {
  const [filas] = await db.query("SELECT * FROM builds");

  return filas;
}

export async function obtenerBuildPorIdData(id) {
  const [filas] = await db.execute(
    "SELECT * FROM builds WHERE id = ?",
    [id]
  );

  return filas[0];
}

export async function crearBuildData(build) {
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
  } = build;

  const [resultado] = await db.execute(
    `INSERT INTO builds (
      pokemon_id,
      titulo,
      objeto,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
      descripcion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      pokemon_id,
      titulo,
      objeto,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
      descripcion,
    ]
  );

  return resultado.insertId;
}

export async function actualizarBuildData(id, build) {
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
  } = build;

  const [resultado] = await db.execute(
    `UPDATE builds
     SET pokemon_id = ?,
         titulo = ?,
         objeto = ?,
         movimiento_1 = ?,
         movimiento_2 = ?,
         movimiento_3 = ?,
         movimiento_4 = ?,
         rol = ?,
         descripcion = ?
     WHERE id = ?`,
    [
      pokemon_id,
      titulo,
      objeto,
      movimiento_1,
      movimiento_2,
      movimiento_3,
      movimiento_4,
      rol,
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
