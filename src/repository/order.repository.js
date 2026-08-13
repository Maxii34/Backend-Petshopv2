import Order from "../models/order.js";

const crearOrden = async (datosOrden) => {
  const nuevaOrden = new Order(datosOrden);

  return await nuevaOrden.save();
};

const obtenerOrdenPorId = async (id) => {
  return await Order.findById(id);
};

const obtenerTodasLasOrdenes = async () => {
  return await Order.find();
};

const actualizarEstadoOrden = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

export default {
  crearOrden,
  obtenerOrdenPorId,
  obtenerTodasLasOrdenes,
  actualizarEstadoOrden,
};
