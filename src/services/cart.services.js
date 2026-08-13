import cartRepository from "../repository/cart.repository.js";

import {
  NotFoundError,
  ValidationError,
} from "../utils/errors.js";

const nuevoCart = async (user, items) => {
  if (!user) {
    throw new ValidationError("El usuario es obligatorio");
  }

  if (!items || items.length === 0) {
    throw new ValidationError(
      "El carrito debe contener al menos un producto"
    );
  }

  const carritoExistente =
    await cartRepository.obtenerCarritoPorUsuario(user);

  if (carritoExistente) {
    for (const reqItem of items) {
      const itemIndex = carritoExistente.items.findIndex(
        (item) =>
          item.product.toString() ===
          reqItem.product.toString()
      );

      if (itemIndex > -1) {
        carritoExistente.items[itemIndex].quantity +=
          reqItem.quantity;
      } else {
        carritoExistente.items.push(reqItem);
      }
    }

    return await cartRepository.actualizarCarrito(
      carritoExistente
    );
  }

  return await cartRepository.crearCarrito({
    user,
    items,
  });
};

const listarCarts = async (userId) => {
  if (!userId) {
    throw new ValidationError("Usuario no identificado");
  }

  return await cartRepository.obtenerCarritoPorUsuario(
    userId
  );
};

const obtenerCarts = async (id) => {
  const carrito =
    await cartRepository.obtenerCarritoPorId(id);

  if (!carrito) {
    throw new NotFoundError("Carrito no encontrado");
  }

  return carrito;
};

const eliminarCart = async (productId, userId) => {
  if (!userId) {
    throw new ValidationError("No autorizado");
  }

  const carrito =
    await cartRepository.obtenerCarritoPorUsuario(userId);

  if (!carrito) {
    throw new NotFoundError("Carrito no encontrado");
  }

  carrito.items = carrito.items.filter(
    (item) =>
      item.product.toString() !== productId
  );

  return await cartRepository.actualizarCarrito(carrito);
};

const actualizarCart = async (id, items) => {
  if (!items) {
    throw new ValidationError(
      "Los productos del carrito son obligatorios"
    );
  }

  const carritoActualizado =
    await cartRepository.actualizarItemsCarrito(
      id,
      items
    );

  if (!carritoActualizado) {
    throw new NotFoundError("Carrito no encontrado");
  }

  return carritoActualizado;
};

export default {
  nuevoCart,
  listarCarts,
  obtenerCarts,
  eliminarCart,
  actualizarCart,
};