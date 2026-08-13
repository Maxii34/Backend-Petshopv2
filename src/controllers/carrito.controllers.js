import cartService from "../services/cart.services.js";

export const nuevoCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    const carrito = await cartService.nuevoCart(user, items);

    res.status(200).json({
      ok: true,
      mensaje: "Carrito actualizado exitosamente.",
      carrito,
    });
  } catch (error) {
    console.error("Error en nuevoCart:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al crear el carrito",
    });
  }
};

export const listarCarts = async (req, res) => {
  try {
    const userId = req.usuario;

    const carrito = await cartService.listarCarts(userId);

    res.status(200).json({
      ok: true,
      carrito,
    });
  } catch (error) {
    console.error("Error en listarCart:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error interno del servidor",
    });
  }
};

export const obtenerCarts = async (req, res) => {
  try {
    const carrito = await cartService.obtenerCarts(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Carrito obtenido exitosamente.",
      carrito,
    });
  } catch (error) {
    console.error("Error en obtenerCart:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al obtener el carrito",
    });
  }
};

export const eliminarcart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.usuario;

    await cartService.eliminarCart(productId, userId);

    res.status(200).json({
      ok: true,
      mensaje: "Producto eliminado del carrito exitosamente",
    });
  } catch (error) {
    console.error("Error en eliminarcart:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al eliminar el producto del carrito",
    });
  }
};

export const actualizarCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const carrito = await cartService.actualizarCart(id, items);

    res.status(200).json({
      ok: true,
      mensaje: "Carrito actualizado exitosamente.",
      carrito,
    });
  } catch (error) {
    console.error("Error en actualizarCart:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al actualizar el carrito",
    });
  }
};
