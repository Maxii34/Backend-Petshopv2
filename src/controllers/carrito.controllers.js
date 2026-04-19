import Cart from "../models/cart.js";

export const nuevoCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    let cart = await Cart.findOne({ user });

    if (cart) {
      for (const reqItem of items) {
        const itemIndex = cart.items.findIndex(
          (p) => p.product.toString() === reqItem.product.toString()
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += reqItem.quantity;
        } else {
          cart.items.push(reqItem);
        }
      }
      await cart.save();

      return res.status(200).json({
        ok: true,
        mensaje: "Carrito actualizado exitosamente.",
        carrito: cart,
      });
    }

    const nuevoCarrito = new Cart({ user, items });
    await nuevoCarrito.save();

    res.status(201).json({
      ok: true,
      mensaje: "Carrito creado exitosamente.",
      carrito: nuevoCarrito,
    });
  } catch (error) {
    console.error("Error en nuevoCart:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al crear el carrito",
    });
  }
};

export const listarCarts = async (req, res) => {
  try {
    const userId = req.usuario; 

    const carrito = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.status(200).json({
      ok: true,
      carrito,
    });
  } catch (error) {
    console.error("Error en listarCart:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor",
    });
  }
};

export const obtenerCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const cartObtenido = await Cart.findById(id);
    if (!cartObtenido) {
      return res.status(404).json({
        ok: false,
        mensaje: "Carrito no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: "Carritos obtenidos exitosamente.",
      carrito: cartObtenido,
    });
  } catch (error) {
    console.error("Error en obtenerCart:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al obtenerCart",
    });
  }
};

export const eliminarcart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.usuario;

    if (!userId) {
      return res.status(401).json({ ok: false, mensaje: "No autorizado" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        ok: false,
        mensaje: "Carrito no encontrado",
      });
    }

    // Filtramos los items quitando el que coincide con productId
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({
      ok: true,
      mensaje: "Producto erradicado del carrito exitosamente",
    });
  } catch (error) {
    console.error("Error en eliminarcart:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al eliminar el producto del carrito",
    });
  }
};

export const actualizarCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const cartActualizado = await Cart.findByIdAndUpdate(
      id,
      { items },
      { new: true, runValidators: true },
    );

    if (!cartActualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: "Carrito no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Carrito actualizado exitosamente.",
      carrito: cartActualizado,
    });
  } catch (error) {
    console.error("Error en actualizarCart:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al actualizar el carrito",
    });
  }
};
