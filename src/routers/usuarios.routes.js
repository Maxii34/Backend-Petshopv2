import { Router } from 'express';
import { nuevoUsuario, listarUsuarios } from '../controllers/usuarios.controllers.js';


const router = Router();

router.route("/")
    .post(nuevoUsuario)
    .get(listarUsuarios);

export default router;