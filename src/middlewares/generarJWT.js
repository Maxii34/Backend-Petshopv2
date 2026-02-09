import jwt from "jsonwebtoken";

export const generarJWT = (id) => {
  if (!id) {
    throw new Error("ID de usuario es requerido");
  }

  if (!process.env.SECRETA_JWT) {
    throw new Error("Clave secreta no configurada");
  }

  try {
    const payload = { id };
    const token = jwt.sign(payload, process.env.SECRETA_JWT, {
      expiresIn: "30m",
    });
    return token;
  } catch (error) {
    console.error(error);
    return new Error("Error al generar el token");
  }
};
