import { Router } from "express";
import { actualizarCart, eliminarcart, listarCarts, nuevoCart, obtenerCarts } from "../controllers/carrito.controllers";

const router = Router();

router.route("/").post(nuevoCart).get(listarCarts)

router.route("/:id").get(obtenerCarts).put(actualizarCart).delete(eliminarcart)


export default router;