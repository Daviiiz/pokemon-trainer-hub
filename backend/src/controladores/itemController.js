import {
  obtenerTodosItems,
  obtenerItemPorIdData,
} from "../data/itemData.js";

export async function obtenerItems(req, res) {
  const items = await obtenerTodosItems();

  res.json(items);
}

export async function obtenerItemPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El id del Item debe ser un número entero positivo.",
    });
  }

  const item = await obtenerItemPorIdData(id);

  if (!item) {
    return res.status(404).json({
      mensaje: "Item no encontrado.",
    });
  }

  res.json(item);
}
