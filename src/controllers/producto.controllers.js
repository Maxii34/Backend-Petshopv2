import Alimento from "../models/alimentos";

export const crearProductos = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron los datos." });
    }
    if (!nombre || !precio || !imagen || !categoria) {
      return res
        .status(400)
        .json({
          mensaje: "Nombre, precio, imagen y categorias son obligatorios",
        });
    }
    const respuesta = new Alimento(req.body);
    await respuesta.save();
    res.status(201).json({ mensaje: "Productos creado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear productos" });
  }
};
