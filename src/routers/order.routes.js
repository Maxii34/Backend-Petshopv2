import { Router } from "express";
import {
  eliminarOrden,
  listarOrden,
  nuevaOrder,
  obtenerOrdenID,
} from "../controllers/order.controllers.js";
import orderValidacion from "../middlewares/ordenValidacion.js";
import validarID from "../middlewares/validacionID.js";

const router = Router();

router.route("/").post(orderValidacion, nuevaOrder).get(listarOrden);
router
  .route("/:id")
  .get(validarID, obtenerOrdenID)
  .delete(validarID, eliminarOrden);

export default router;
