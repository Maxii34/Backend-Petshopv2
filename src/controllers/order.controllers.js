import order from "../models/order.js";

// Crear orden
export const nuevaOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    const totalAmount = products.reduce((acc, item) => {
      return acc + item.quantity * item.priceAtPurchase;
    }, 0);

    const ordenNueva = new order({
      user,
      products,
      totalAmount,
      status: "pendiente",
    });
    await ordenNueva.save();

    res.status(201).json({
      ok: true,
      mensaje: "Orden creada, procede al pago",
      orderId: ordenNueva._id,
      totalAmount: ordenNueva.totalAmount,
    });
  } catch (error) {
    console.error("Error en nuevaOrder:", error);
    res.status(500).json({ ok: false, mensaje: "Error al crear la orden" });
  }
};

// Webhook de Mercado Pago
export const confirmarPagoWebhook = async (req, res) => {
  try {
    const { data } = req.body;
    const { orderId, paymentId, status } = data;

    if (status === "approved") {
      await order.findByIdAndUpdate(orderId, {
        status: "pagado",
        "payment.paymentId": paymentId,
        "payment.method": "mercadopago",
        "payment.paidAt": new Date(),
      });

      res.status(200).json({ ok: true, mensaje: "Pago confirmado" });
    } else if (status === "rejected") {
      await order.findByIdAndUpdate(orderId, { status: "cancelado" });
      res.status(200).json({ ok: true, mensaje: "Pago rechazado" });
    }
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ ok: false });
  }
};

// Obtener orden por ID (para historial/detalles)
export const obtenerOrdenID = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await order.findById(id);

    if (!orden) {
      return res.status(404).json({
        ok: false,
        mensaje: "Orden no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Orden encontrada exitosamente.",
      order: orden,
    });
  } catch (error) {
    console.error("Error en obtenerOrdenID:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener la orden",
    });
  }
};

// Listar órdenes (admin)
export const listarOrden = async (req, res) => {
  try {
    const ordenesListadas = await order.find();
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

// OPCIONAL: Actualizar estado de orden (para cambiar a "enviado", "entregado", etc.)
export const actualizarEstadoOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const estadosValidos = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];
    if (!estadosValidos.includes(status)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Estado inválido",
      });
    }

    const ordenActualizada = await order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({
        ok: false,
        mensaje: "Orden no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Orden actualizada exitosamente.",
      order: ordenActualizada,
    });
  } catch (error) {
    console.error("Error en actualizarEstadoOrden:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al actualizar la orden",
    });
  }
};