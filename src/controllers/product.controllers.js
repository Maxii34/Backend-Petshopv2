import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import product from "../models/product.js";

export const agregarProductoNuevo = async (req, res) => {
  try {

    if (req.body.detalles) {
      req.body.detalles = JSON.parse(req.body.detalles);
    }

    let imagenUrl = "";

    if (req.file) {
      const resultado = await subirImagenCloudinary(req.file.buffer);
      imagenUrl = resultado.secure_url;
    }

    req.body.imagenes = [imagenUrl];

    const nuevoProducto = new product(req.body);
    await nuevoProducto.save();

    res.status(201).json({
      ok: true,
      mensaje: "Producto agregado correctamente",
      producto: nuevoProducto
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok:false,
      mensaje:"Error interno del servidor"
    });
  }
};

export const listarProductos = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json(products, { mensaje: "productos listados" });
  } catch (error) {
    console.error("Error en listarProductos:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al listar los producto",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoObtenido = await product.findById(id);

    if (!productoObtenido) {
      return res.status(404).json({
        ok: false,
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Producto obtenido",
      producto: productoObtenido,
    });
  } catch (error) {
    console.error("Error en obtenerProducto:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al obtener el producto",
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoBuscado = await product.findByIdAndDelete(id);
    if (!productoBuscado) {
      return res.status(404).json({
        ok: false,
        mensaje: "Producto no encontrado",
      });
    }

    res
      .status(200)
      .json({ ok: true, mensaje: "Producto eliminado correctamenete" });
  } catch (error) {
    console.error("Error al eliminar Producto", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al eliminar producto",
    });
  }
};

export const editarProducto = async (req, res) => {
  try {
    console.log(req.params.id);
    const productoEditado = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!productoEditado) {
      return res.status(404).json({
        ok: false,
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Producto editado correctamente",
      producto: productoEditado,
    });
  } catch (error) {
    console.error("Error al editar Producto", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al editar producto",
    });
  }
};
