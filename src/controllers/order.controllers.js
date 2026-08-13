import orderService from "../services/order.services.js";

// Crear orden
export const nuevaOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    const ordenNueva = await orderService.nuevaOrder(user, products);

    res.status(201).json({
      ok: true,
      mensaje: "Orden creada, procede al pago",
      orderId: ordenNueva._id,
      totalAmount: ordenNueva.totalAmount,
    });
  } catch (error) {
    console.error("Error en nuevaOrder:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al crear la orden",
    });
  }
};

// Obtener orden por ID
export const obtenerOrdenID = async (req, res) => {
  try {
    const orden = await orderService.obtenerOrden(req.params.id);

    res.status(200).json({
      ok: true,
      mensaje: "Orden encontrada exitosamente.",
      order: orden,
    });
  } catch (error) {
    console.error("Error en obtenerOrdenID:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode ? error.message : "Error al obtener la orden",
    });
  }
};

// Listar órdenes
export const listarOrden = async (req, res) => {
  try {
    const ordenesListadas = await orderService.listarOrdenes();

    res.status(200).json({
      ok: true,
      mensaje: "Órdenes listadas exitosamente.",
      orders: ordenesListadas,
    });
  } catch (error) {
    console.error("Error en listarOrden:", error);

    res.status(500).json({
      ok: false,
      mensaje: "Error al listar las órdenes",
    });
  }
};

// Actualizar estado de orden
export const actualizarEstadoOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ordenActualizada = await orderService.actualizarEstado(id, status);

    res.status(200).json({
      ok: true,
      mensaje: "Orden actualizada exitosamente.",
      order: ordenActualizada,
    });
  } catch (error) {
    console.error("Error en actualizarEstadoOrden:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error al actualizar la orden",
    });
  }
};
