import Cart from "../models/cart.js";

const vaciarCarrito = async (user) => {
  return await Cart.findOneAndUpdate(
    { user },
    { $set: { items: [] } }
  );
};

export default {
  vaciarCarrito,
};