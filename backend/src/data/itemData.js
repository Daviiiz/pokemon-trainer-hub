import db from "../config/db.js";

export async function obtenerTodosItems() {
  const [filas] = await db.query(
    `SELECT
      id,
      nombre
     FROM items
     ORDER BY nombre`
  );

  return filas;
}

export async function obtenerItemPorIdData(id) {
  const [filas] = await db.execute(
    `SELECT
      id,
      nombre
     FROM items
     WHERE id = ?`,
    [id]
  );

  return filas[0];
}
