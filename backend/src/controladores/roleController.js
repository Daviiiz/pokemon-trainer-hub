import {
  obtenerTodosRoles,
  obtenerRolPorIdData,
} from "../data/roleData.js";

export async function obtenerRoles(req, res) {
  const roles = await obtenerTodosRoles();

  res.json(roles);
}

export async function obtenerRolPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El id del Rol debe ser un número entero positivo.",
    });
  }

  const rol = await obtenerRolPorIdData(id);

  if (!rol) {
    return res.status(404).json({
      mensaje: "Rol no encontrado.",
    });
  }

  res.json(rol);
}
