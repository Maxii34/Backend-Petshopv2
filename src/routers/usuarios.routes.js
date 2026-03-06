import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
  editarUsuariocampos,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").post(crearUsuario).get(listarUsuarios);

router.route("/:id").delete(eliminarUsuario).put(actualizarUsuario).patch(editarUsuariocampos);

router.route("/login").post(iniciarSesion);

export default router;
