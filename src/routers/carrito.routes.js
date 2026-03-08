import { Router } from "express";
import {
  actualizarCart,
  eliminarcart,
  listarCarts,
  nuevoCart,
  obtenerCarts,
} from "../controllers/carrito.controllers.js";
import cartValidacion from "../middlewares/carritoValidacion.js";
import validarID from "../middlewares/validacionID.js";

const router = Router();

router.route("/").post(cartValidacion, nuevoCart).get(listarCarts);

router
  .route("/:id")
  .get(validarID, obtenerCarts)
  .put([validarID, cartValidacion], actualizarCart)
  .delete(validarID, eliminarcart);

export default router;
