import { Router } from "express";
import userRoutes from "./usuarios.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import cartRoutes from "./carrito.routes.js";

const router = Router();

//http://localhost:3000/api/carrito
router.use("/carrito", cartRoutes);

//http://localhost:3000/api/orden
router.use("/orden", orderRoutes);

//http://localhost:3000/api/productos
router.use("/productos", productRoutes);

//http://localhost:3000/api/usuarios
router.use("/usuarios", userRoutes);

export default router;
