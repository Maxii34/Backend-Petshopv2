export const generarJWT = (userId) => {
  try {
    const payload = {
      userId,
    };

    const token = jwt.sign(payload, process.env.SECRETA_JWT, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Error al generar JWT", error);
    throw new Error("Error al generar token");
  }
};
