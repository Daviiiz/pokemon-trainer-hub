import db from "../config/db.js";

export async function obtenerTodosRoles() {
  const [filas] = await db.query(
    `SELECT
      id,
      nombre
     FROM roles
     ORDER BY nombre`
  );

  return filas;
}

export async function obtenerRolPorIdData(id) {
  const [filas] = await db.execute(
    `SELECT
      id,
      nombre
     FROM roles
     WHERE id = ?`,
    [id]
  );

  return filas[0];
}
