import { Router } from "express";
import { eliminarOrden, listarOrden, nuevaOrder, obtenerOrdenID } from "../controllers/order.controllers.js";

const router = Router();

router.route("/").post(nuevaOrder).get(listarOrden);
router.route("/").get(obtenerOrdenID).delete(eliminarOrden);

export default router;