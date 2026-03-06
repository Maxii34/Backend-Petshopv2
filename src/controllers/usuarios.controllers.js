import { generarJWT } from "../middlewares/generarJWT.js";
import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req, res) => {
  try {
    const { rol } = req.body;
    // verifica si ya esiste el email
    const usuarioExistente = await Usuario.findOne({ email: req.body.email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }
    // Verificar si ya existe un usuario con rol "admin"
    if (rol === "admin") {
      const adminExistente = await Usuario.findOne({ rol: "admin" });
      if (adminExistente) {
        return res
          .status(400)
          .json({ mensaje: "Ya existe un usuario con rol admin" });
      }
    }
    // Crear el usuario
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario, {
      mensaje:
        rol === "admin"
          ? "Usuario admin creado exitosamente"
          : "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json({ mensaje: "Lista de usuarios", usuarios: usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar usuarios" });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: "Email y contraseña son obligatorios" });
    }
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Credenciales inválidas" });
    }
    const passwordValido = await bcrypt.compare(
      password,
      usuarioEncontrado.password,
    );
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
    const token = generarJWT(usuarioEncontrado._id);
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await Usuario.findById(id);
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (usuarioEncontrado.rol === "admin") {
      const unicoAdmin = await Usuario.countDocuments({ rol: "admin" });
      if (unicoAdmin <= 1) {
        return res.status(400).json({
          mensaje: "No se puede eliminar el único admin del sistema.",
        });
      }
    }

    await Usuario.findByIdAndDelete(id);

    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    //Se evita que se pueda cambiar el password y rol en esta peticion
    const { password, rol, email, ...datosActualizables } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizables,
      { new: true, runValidators: true },
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

export const editarUsuariocampos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, rol, ...datosActualizables } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizables,
      { new: true, runValidators: true },
    );

    if (!usuarioActualizado) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al actualizar" });
  }
};

export const obtenerUsuario = async (req, res) => {};
