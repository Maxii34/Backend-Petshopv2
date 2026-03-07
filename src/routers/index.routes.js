import { Router } from 'express';
import userRoutes from './usuarios.routes.js';
import productRoutes from './product.routes.js'

const router = Router();

//http://localhost:3000/api/productos
router.use("/productos", productRoutes);

//http://localhost:3000/api/usuarios
router.use("/usuarios", userRoutes);

export default router;