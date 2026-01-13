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
    res.status(201).json({
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
      usuarioEncontrado.password
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
