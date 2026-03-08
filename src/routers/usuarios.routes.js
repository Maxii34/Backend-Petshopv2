import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
} from "../controllers/usuarios.controllers.js";
import userValidacion from "../middlewares/usuarioValidations.js"

const router = Router();

router.route("/").post(userValidacion, crearUsuario).get(listarUsuarios);

router.route("/:id").delete(eliminarUsuario).put( userValidacion,actualizarUsuario);

router.route("/login").post(iniciarSesion);

export default router;
