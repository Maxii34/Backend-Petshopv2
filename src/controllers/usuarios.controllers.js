import userService from "../services/user.services.js";

export const crearUsuario = async (req, res) => {
  try {
    const usuario = await userService.crearUsuario(req.body);

    res.status(201).json({
      ok: true,
      mensaje:
        usuario.rol === "admin"
          ? "Usuario admin creado exitosamente"
          : "Usuario creado exitosamente",
      usuario,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al crear usuario",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.listarUsuarios();

    res.status(200).json({
      ok: true,
      mensaje: "Lista de usuarios",
      usuarios,
    });
  } catch (error) {
    console.error("Error al listar usuarios:", error);

    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al listar usuarios",
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resultado = await userService.iniciarSesion(email, password);

    res.cookie("token", resultado.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(200).json({
      ok: true,
      mensaje: "Inicio de sesión exitoso",
      token: resultado.token,
      usuario: resultado.usuario,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al iniciar sesión",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await userService.eliminarUsuario(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al eliminar usuario",
    });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await userService.actualizarUsuario(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      ok: true,
      mensaje: "Usuario actualizado correctamente",
      usuario,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al actualizar usuario",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await userService.obtenerUsuario(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Usuario obtenido correctamente",
      usuario,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al obtener usuario",
    });
  }
};
