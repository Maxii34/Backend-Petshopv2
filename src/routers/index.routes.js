import { Router } from "express";
import userRoutes from "./usuarios.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./carrito.routes.js";
import pagosRoutes from "./pagos.routes.js";


const router = Router();

//http://localhost:3000/api/carrito
router.use("/carrito", cartRoutes);

//http://localhost:3000/api/pagos
router.use("/pagos", pagosRoutes);

//http://localhost:3000/api/productos
router.use("/productos", productRoutes);

//http://localhost:3000/api/usuarios
router.use("/usuarios", userRoutes);

export default router;
