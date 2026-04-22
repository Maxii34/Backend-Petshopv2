import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición o el formato es incorrecto",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { usuario } = jwt.verify(token, process.env.SECRETA_JWT);

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

export default validarJWT;
