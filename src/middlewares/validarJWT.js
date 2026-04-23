import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  try {
    // Obtener header Authorization
    const authHeader = req.header("Authorization");
    let token;

    // Validar formato Bearer token
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la petición",
      });
    }

    // Verificar token
    const payload = jwt.verify(token, process.env.SECRETA_JWT);

    // Guardar datos en request
    req.usuario = payload.id;
    req.rol = payload.rol;

    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        msg: "El token ha expirado",
      });
    }

    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

export default validarJWT;