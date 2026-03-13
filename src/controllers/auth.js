import jwt from 'jsonwebtoken';

export const cerrarSesion = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    ok: true,
    mensaje: "Sesión cerrada exitosamente",
  });
};