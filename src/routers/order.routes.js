import { Router } from "express";
import {
  listarOrden,
  nuevaOrder,
  obtenerOrdenID,
  confirmarPagoWebhook,
  actualizarEstadoOrden,
} from "../controllers/order.controllers.js";
import orderValidacion from "../middlewares/ordenValidacion.js";
import validarID from "../middlewares/validacionID.js";

const router = Router();

// Crear orden + Listar todas
router.route("/").post(orderValidacion, nuevaOrder).get(listarOrden);

// Webhook de Mercado Pago (sin validación de ID)
router.post("/webhook", confirmarPagoWebhook);

// Obtener orden por ID + Actualizar estado
router
  .route("/:id")
  .get(validarID, obtenerOrdenID)
  .patch(validarID, actualizarEstadoOrden);

export default router;