import paymentService from "../services/payment.services.js";

export const crearOrdenCarrito = async (req, res) => {
  try {
    const { user, productosCarrito } = req.body;

    const resultado = await paymentService.crearOrdenCarrito(
      user,
      productosCarrito
    );

    res.status(201).json({
      ok: true,
      ...resultado,
    });
  } catch (error) {
    console.error("Error en crearOrdenCarrito:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Ocurrió un error al procesar el pago",
    });
  }
};

export const recibirWebhook = async (req, res) => {
  try {
    await paymentService.recibirWebhook(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en recibirWebhook:", error);

    res.status(error.statusCode || 500).json({
      ok: false,
      mensaje: error.statusCode
        ? error.message
        : "Error interno del servidor al procesar el webhook",
    });
  }
};