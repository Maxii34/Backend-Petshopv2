import orderRepository from "../repositories/order.repository.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

const nuevaOrder = async (user, products) => {
  if (!products || products.length === 0) {
    throw new ValidationError("La orden debe contener al menos un producto");
  }

  const totalAmount = products.reduce((acc, item) => {
    return acc + item.quantity * item.priceAtPurchase;
  }, 0);

  const ordenNueva = await orderRepository.crearOrden({
    user,
    products,
    totalAmount,
    status: "pendiente",
  });

  return ordenNueva;
};

const obtenerOrden = async (id) => {
  const orden = await orderRepository.obtenerOrdenPorId(id);

  if (!orden) {
    throw new NotFoundError("Orden no encontrada");
  }

  return orden;
};

const listarOrdenes = async () => {
  return await orderRepository.obtenerTodasLasOrdenes();
};

const actualizarEstado = async (id, status) => {
  const estadosValidos = [
    "pendiente",
    "pagado",
    "enviado",
    "entregado",
    "cancelado",
  ];

  if (!estadosValidos.includes(status)) {
    throw new ValidationError("Estado inválido");
  }

  const ordenActualizada = await orderRepository.actualizarEstadoOrden(
    id,
    status,
  );

  if (!ordenActualizada) {
    throw new NotFoundError("Orden no encontrada");
  }

  return ordenActualizada;
};

export default {
  nuevaOrder,
  obtenerOrden,
  listarOrdenes,
  actualizarEstado,
};
