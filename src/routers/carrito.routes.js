import { Router } from "express";
import { nuevoCart } from "../controllers/carrito.controllers";

const router = Router();

router.route("/").post(nuevoCart)

export default router;