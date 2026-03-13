const validarToken = (req, res, next) => {
  try {
    // La cookie se obtiene automáticamente
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        mensaje: "No se proporcionó token en la petición",
      });
    }

    const payload = jwt.verify(token, process.env.SECRET);
    req.usuario = payload.usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      mensaje: "Token inválido o expirado",
    });
  }
};

export default validarToken;