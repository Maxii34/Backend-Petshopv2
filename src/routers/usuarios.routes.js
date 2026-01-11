import { Router } from 'express';
import { nuevoUsuario } from '../controllers/usuarios.controllers.js';


const router = Router();

router.route("/")
    .post(nuevoUsuario);

export default router;