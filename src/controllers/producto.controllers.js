import Alimento from "../models/alimentos";

export const crearProductos = async (req, res) => {
  try {
    // Verificar que se enviaron datos
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron los datos." });
    }

    // Crear y guardar el producto
    const nuevoAlimento = new Alimento(req.body);
    await nuevoAlimento.save();

    res.status(201).json({
      mensaje: "Producto creado exitosamente.",
      producto: nuevoAlimento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
};
