import { Router } from 'express';
import { crearProductos } from '../controllers/producto.controllers';


const router = Router();

router.route("/").post(crearProductos)

export default router;