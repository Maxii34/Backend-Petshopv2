import bcrypt from "bcrypt";
import { generarJWT } from "../middlewares/generarJWT.js";
import userRepository from "../repositories/user.repository.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

const crearUsuario = async (datosUsuario) => {
  const { email, rol } = datosUsuario;

  const usuarioExistente = await userRepository.obtenerUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw new ValidationError("El email ya está registrado");
  }

  if (rol === "admin") {
    const adminExistente = await userRepository.obtenerUsuarioPorRol("admin");

    if (adminExistente) {
      throw new ValidationError("Ya existe un usuario con rol admin");
    }
  }

  return await userRepository.crearUsuario(datosUsuario);
};

const listarUsuarios = async () => {
  return await userRepository.obtenerTodosLosUsuarios();
};

const iniciarSesion = async (email, password) => {
  if (!email || !password) {
    throw new ValidationError("Email y contraseña son obligatorios");
  }

  const usuario = await userRepository.obtenerUsuarioPorEmail(email);

  if (!usuario) {
    throw new ValidationError("Credenciales inválidas");
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) {
    throw new ValidationError("Credenciales inválidas");
  }

  const token = generarJWT(usuario._id);

  return {
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  };
};

const eliminarUsuario = async (id) => {
  const usuario = await userRepository.obtenerUsuarioPorId(id);

  if (!usuario) {
    throw new NotFoundError("Usuario no encontrado");
  }

  if (usuario.rol === "admin") {
    const cantidadAdmins = await userRepository.contarUsuariosPorRol("admin");

    if (cantidadAdmins <= 1) {
      throw new ValidationError(
        "No se puede eliminar el único administrador del sistema.",
      );
    }
  }

  await userRepository.eliminarUsuarioPorId(id);
};

const actualizarUsuario = async (id, datosUsuario) => {
  const { email, password } = datosUsuario;

  if (email !== undefined || password !== undefined) {
    throw new ValidationError(
      "No se pueden actualizar email ni password desde aquí",
    );
  }

  const { nombre, apellido, telefono } = datosUsuario;

  const datosActualizables = {
    nombre,
    apellido,
    telefono,
  };

  Object.keys(datosActualizables).forEach((key) => {
    if (datosActualizables[key] === undefined) {
      delete datosActualizables[key];
    }
  });

  const usuarioActualizado = await userRepository.actualizarUsuario(
    id,
    datosActualizables,
  );

  if (!usuarioActualizado) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return usuarioActualizado;
};

const obtenerUsuario = async (id) => {
  const usuario = await userRepository.obtenerUsuarioPorId(id);

  if (!usuario) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return usuario;
};

export default {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
  obtenerUsuario,
};
