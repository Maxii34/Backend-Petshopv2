import { Router } from 'express';
import productRoutes from './product.routes.js';

const router = Router();

//http://localhost:3000/api/productos
router.route("/productos", productRoutes);

export default router;