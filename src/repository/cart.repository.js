import Cart from "../models/cart.js";

const vaciarCarrito = async (user) => {
  return await Cart.findOneAndUpdate({ user }, { $set: { items: [] } });
};

const obtenerCarritoPorUsuario = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

const obtenerCarritoPorId = async (id) => {
  return await Cart.findById(id);
};

const crearCarrito = async (datosCarrito) => {
  const nuevoCarrito = new Cart(datosCarrito);

  return await nuevoCarrito.save();
};

const actualizarCarrito = async (carrito) => {
  return await carrito.save();
};

const actualizarItemsCarrito = async (id, items) => {
  return await Cart.findByIdAndUpdate(
    id,
    { items },
    {
      new: true,
      runValidators: true,
    },
  );
};

export default {
  vaciarCarrito,
  obtenerCarritoPorUsuario,
  obtenerCarritoPorId,
  crearCarrito,
  actualizarCarrito,
  actualizarItemsCarrito,
};
