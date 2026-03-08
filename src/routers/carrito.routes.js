import { Router } from "express";
import {
  actualizarCart,
  eliminarcart,
  listarCarts,
  nuevoCart,
  obtenerCarts,
} from "../controllers/carrito.controllers";
import cartValidacion from "../middlewares/carritoValidacion"

const router = Router();

router.route("/").post(cartValidacion, nuevoCart).get(listarCarts);

router.route("/:id").get(obtenerCarts).put(cartValidacion, actualizarCart).delete(eliminarcart);

export default router;
