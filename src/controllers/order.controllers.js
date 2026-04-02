import order from "../models/order.js";
import Usuario from "../models/usuarios.js";

//crear ordenes
export const nuevaOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    const totalAmount = products.reduce((acc, item) => {
      return acc + item.quantity * item.priceAtPurchase;
    }, 0);

    const ordenNueva = new order({ user, products, totalAmount });
    await ordenNueva.save();

    // Vinculamos los productos comprados al usuario (evitando duplicados con $addToSet)
    const productIds = products.map((item) => item.product);
    await Usuario.findByIdAndUpdate(user, {
      $addToSet: { productos: { $each: productIds } },
    });

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

// Buscar ordenes
export const listarOrden = async (req, res) => {
  try {
    const ordenesListadas = await order.find();
    res.status(200).json({
      ok: true,
      mensaje: "Órdenes listadas exitosamente.",
      orders: ordenesListadas,
    });
  } catch (error) {
    console.error("Error en listarOrdenes:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al listar las órdenes",
    });
  }
};

// Buscar UNA orden por ID
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
    console.error("Error en obtenerOrden:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al obtener la orden",
    });
  }
};

export const eliminarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const ordenEliminada = await order.findByIdAndDelete(id);

    if (!ordenEliminada) {
      return res.status(404).json({
        ok: false,
        mensaje: "Orden no encontrada",
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Orden eliminada exitosamente.",
      order: ordenEliminada,
    });
  } catch (error) {
    console.error("Error en eliminarOrden:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor al eliminar la orden",
    });
  }
};