import { Router } from 'express';
import productRoutes from './product.routes.js';
import userRoutes from './usuarios.routes.js';

const router = Router();

//http://localhost:3000/api/productos
router.use("/productos", productRoutes);

//http://localhost:3000/api/usuarios
router.use("/usuarios", userRoutes);

export default router;