import db from "../config/db.js";

export async function obtenerTodosPokemons() {
  const [filas] = await db.query("SELECT * FROM pokemon");

  return filas;
}

export async function obtenerPokemonPorIdData(id) {
  const [filas] = await db.execute(
    "SELECT * FROM pokemon WHERE id = ?",
    [id]
  );

  return filas[0];
}

export async function crearPokemonData(id, nombre) {
  await db.execute(
    "INSERT INTO pokemon (id, nombre) VALUES (?, ?)",
    [id, nombre]
  );
}

export async function actualizarPokemonData(id, nombre) {
  const [resultado] = await db.execute(
    "UPDATE pokemon SET nombre = ? WHERE id = ?",
    [nombre, id]
  );

  return resultado.affectedRows;
}

export async function eliminarPokemonData(id) {
  const [resultado] = await db.execute(
    "DELETE FROM pokemon WHERE id = ?",
    [id]
  );

  return resultado.affectedRows;
}