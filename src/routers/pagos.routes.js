import { Router } from "express"
import { crearOrdenCarrito, recibirWebhook } from "../controllers/pagos.controllers.js";

const router = Router();

//http://localhost:3000/api/pagos/crear-orden-carrito
router.route('/crear-orden-carrito').post(crearOrdenCarrito)
//http://localhost:3000/api/pagos/webhook
router.route('/webhook').post(recibirWebhook)

export default router;