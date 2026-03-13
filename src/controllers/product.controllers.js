import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import product from "../models/product.js";

export const agregarProductoNuevo = async (req, res) => {
  try {

    if (req.body.detalles) {
      req.body.detalles = JSON.parse(req.body.detalles);
    }

    if (!req.files || !req.files.imagenes || req.files.imagenes.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debes enviar al menos una imagen del producto"
      });
    }

    const imagenes = [];
    for (const file of req.files.imagenes) {
      const resultado = await subirImagenCloudinary(file.buffer);
      imagenes.push(resultado.secure_url);
    }
    
    req.body.imagenes = imagenes;

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
    const productobuscado = await product.findById(req.params.id);
    if (!productobuscado) {
      return res.status(404).json({ ok: false, mensaje: "Producto no encontrado" });
    }

    if (req.file){
      const resultado = await subirImagenCloudinary(req.file.buffer);
      productobuscado.imagenes = resultado.secure_url;
    }

    productobuscado.nombre = req.body.nombre;
    productobuscado.descripcion = req.body.descripcion;
    productobuscado.precio = req.body.precio;
    productobuscado.categoria = req.body.categoria;
    productobuscado.stock = req.body.stock;
    productobuscado.marca = req.body.marca;
    productobuscado.tipoAnimal = req.body.tipoAnimal;
    productobuscado.categoria = req.body.categoria;
    productobuscado.detalles = req.body.detalles;

    await productobuscado.save();

    res.status(200).json({
      ok: true,
      mensaje: "Producto editado correctamente",
      producto: productobuscado,
    });
  } catch (error) {
    console.error("Error al editar Producto", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al editar producto",
    });
  }
};
