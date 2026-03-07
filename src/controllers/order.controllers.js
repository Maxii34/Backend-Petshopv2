import order from "../models/order.js";

export const nuevaOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    const totalAmount = products.reduce((acc, item) => {
      return acc + item.quantity * item.priceAtPurchase;
    }, 0); 

    const ordenNueva = new order({ user, products, totalAmount });
    await ordenNueva.save();

    res.status(201).json({
      ok: true,
      mensaje: "Orden creada exitosamente",
      order: ordenNueva,
    });
  } catch (error) {
    console.error("Error en nuevaOrder:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al agregar nueva orden",
    });
  }
};
