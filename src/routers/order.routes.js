import { Router } from "express";
import {
  eliminarOrden,
  listarOrden,
  nuevaOrder,
  obtenerOrdenID,
} from "../controllers/order.controllers.js";
import orderValidacion from "../middlewares/ordenValidacion.js"

const router = Router();

router.route("/").post(orderValidacion, nuevaOrder).get(listarOrden);
router.route("/:id").get(obtenerOrdenID).delete(eliminarOrden);

export default router;
