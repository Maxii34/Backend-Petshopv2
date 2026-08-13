import { Preference, Payment } from "mercadopago";

import productRepository from "../repository/product.repository.js";
import orderRepository from "../repository/order.repository.js";
import cartRepository from "../repository/cart.repository.js";

/*
 * TODO: Refactorizar integración con Mercado Pago.
 *
 * Estas funciones provienen de la lógica anterior de pagos:
 * - crearOrdenCarrito
 * - recibirWebhook
 *
 * Mercado Pago se migrará/refactorizará posteriormente.
 */

import client from "../servers/mercadopago.js";

import {
  NotFoundError,
  ValidationError,
} from "../utils/errors.js";

const crearOrdenCarrito = async (user, productosCarrito) => {
  if (!productosCarrito || productosCarrito.length === 0) {
    throw new ValidationError("El carrito está vacío");
  }

  const idsProductos = productosCarrito.map((producto) => producto.id);

  const productosDB =
    await productRepository.obtenerProductosPorIds(idsProductos);

  const productosMap = new Map(
    productosDB.map((producto) => [
      producto._id.toString(),
      producto,
    ])
  );

  let totalPedido = 0;

  const itemsParaMP = [];
  const productosDelPedido = [];

  for (const itemCarrito of productosCarrito) {
    const productoDB = productosMap.get(itemCarrito.id);

    if (productoDB) {
      itemsParaMP.push({
        title: productoDB.nombreProducto,
        quantity: itemCarrito.quantity,
        currency_id: "ARS",
        unit_price: productoDB.precio,
      });

      productosDelPedido.push({
        product: productoDB._id,
        quantity: itemCarrito.quantity,
      });

      totalPedido +=
        productoDB.precio * itemCarrito.quantity;
    }
  }

  if (itemsParaMP.length === 0) {
    throw new NotFoundError(
      "Ninguno de los productos del carrito fue encontrado"
    );
  }

  const nuevoPedido = await orderRepository.crearPedido({
    user,
    products: productosDelPedido,
    total: totalPedido,
    status: "pendiente",
  });

  await cartRepository.vaciarCarrito(user);


  const preference = {
    items: itemsParaMP,

    back_urls: {
      success: `${process.env.FRONTEND_URL}`,
    },

    external_reference: nuevoPedido._id.toString(),
  };

  const preferenceClient = new Preference(client);

  const respuesta = await preferenceClient.create({
    body: preference,
  });

  return {
    init_point: respuesta.init_point,
  };
};

const recibirWebhook = async (notification) => {
  if (notification.type !== "payment") {
    return;
  }

  const paymentClient = new Payment(client);

  const payment = await paymentClient.get({
    id: notification.data.id,
  });

  if (!payment || payment.status !== "approved") {
    return;
  }

  console.log("Pago aprobado. ID:", payment.id);

  const pedidoId = payment.external_reference;

  const pedido =
    await orderRepository.obtenerPedidoPorId(pedidoId);

  if (!pedido) {
    throw new NotFoundError(
      `Pedido con ID ${pedidoId} no encontrado`
    );
  }

  if (pedido.status === "pendiente") {
    pedido.status = "pagado";
    pedido.paymentId = payment.id;

    await orderRepository.actualizarPedido(pedido);

    console.log(
      `Pedido ${pedidoId} actualizado a pagado.`
    );
  } else {
    console.log(
      `El pedido ${pedidoId} ya fue procesado. Estado actual: ${pedido.status}`
    );
  }
};

export default {
  crearOrdenCarrito,
  recibirWebhook,
};