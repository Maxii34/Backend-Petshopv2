import { Router } from "express";
import {
  listarOrden,
  nuevaOrder,
  obtenerOrdenID,
  actualizarEstadoOrden,
} from "../controllers/order.controllers.js";
import orderValidacion from "../middlewares/ordenValidacion.js";
import validarID from "../middlewares/validacionID.js";

const router = Router();

// Crear orden + listar todas
router
  .route("/")
  .post(orderValidacion, nuevaOrder)
  .get(listarOrden);

// Obtener orden por ID + actualizar estado
router
  .route("/:id")
  .get(validarID, obtenerOrdenID)
  .patch(validarID, actualizarEstadoOrden);

export default router;