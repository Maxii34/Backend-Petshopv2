import Usuario from "../models/usuarios.js";

export const nuevoUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};