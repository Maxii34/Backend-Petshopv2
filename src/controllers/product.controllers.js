import productService from "../services/product.services.js";


export const agregarProductoNuevo = async (req, res) => {
  try {
    const producto = await productService.agregarProducto(
      req.body,
      req.files
    );

    res.status(201).json({
      ok: true,
      mensaje: "Producto agregado correctamente",
      producto,
    });
  } catch (error) {
    console.error("Error en agregarProductoNuevo:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor",
    });
  }
};

export const listarProductos = async (req, res) => {
  try {
    const products =
      await productService.obtenerTodosLosProductosService();

    res.status(200).json({
      ok: true,
      mensaje: "Productos listados correctamente",
      productos: products,
    });
  } catch (error) {
    console.error("Error en listarProductos:", error);

    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al listar los productos",
    });
  }
};

export const listarProductosFiltrados = async (req, res) => {
  try {
    const resultado =
      await productService.listarProductosFiltrados(req.query);

    res.status(200).json({
      ok: true,
      mensaje: "Productos filtrados correctamente",
      ...resultado,
    });
  } catch (error) {
    console.error("Error en listarProductosFiltrados:", error);

    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await productService.obtenerProducto(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Producto obtenido",
      producto,
    });
  } catch (error) {
    console.error("Error en obtenerProducto:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al obtener el producto",
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    await productService.eliminarProducto(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar Producto:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al eliminar producto",
    });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const producto = await productService.editarProducto(
      req.params.id,
      req.body,
      req.file
    );

    res.status(200).json({
      ok: true,
      mensaje: "Producto editado correctamente",
      producto,
    });
  } catch (error) {
    console.error("Error al editar Producto:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al editar producto",
    });
  }
};