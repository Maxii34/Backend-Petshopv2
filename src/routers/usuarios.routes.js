import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/")
    .post(crearUsuario)
    .get(listarUsuarios);

router.route("/login")
    .post(iniciarSesion);

export default router;
