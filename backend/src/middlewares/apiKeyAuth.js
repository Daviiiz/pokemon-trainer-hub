export function apiKeyAuth(req, res, next) {
  const apiKey = req.get("x-api-key");

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      mensaje: "API key no válida.",
    });
  }

  next();
}
