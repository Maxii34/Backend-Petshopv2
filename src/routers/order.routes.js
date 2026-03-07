import { Router } from "express";
import { nuevaOrder } from "../controllers/order.controllers.js";

const router = Router();

router.route("/").post(nuevaOrder)

export default router;