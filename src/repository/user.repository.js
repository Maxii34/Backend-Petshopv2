import Usuario from "../models/usuarios.js";

const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = new Usuario(datosUsuario);
  return await nuevoUsuario.save();
};

const obtenerUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

const obtenerUsuarioPorRol = async (rol) => {
  return await Usuario.findOne({ rol });
};

const obtenerTodosLosUsuarios = async () => {
  return await Usuario.find();
};

const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id);
};

const contarUsuariosPorRol = async (rol) => {
  return await Usuario.countDocuments({ rol });
};

const eliminarUsuarioPorId = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

const actualizarUsuario = async (id, datosActualizables) => {
  return await Usuario.findByIdAndUpdate(
    id,
    datosActualizables,
    {
      new: true,
      runValidators: false,
    }
  );
};

export default {
  crearUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorRol,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  contarUsuariosPorRol,
  eliminarUsuarioPorId,
  actualizarUsuario,
};