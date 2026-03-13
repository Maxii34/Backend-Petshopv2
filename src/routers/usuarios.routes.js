import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
} from "../controllers/usuarios.controllers.js";
import userValidacion from "../middlewares/usuarioValidations.js";
import validarID from "../middlewares/validacionID.js";
import { cerrarSesion } from "../controllers/auth.js";
import validarToken from "../middlewares/validarJWT.js";

const router = Router();

router.route("/").post([validarToken, userValidacion], crearUsuario).get(listarUsuarios);

router
  .route("/:id")
  .delete([validarToken, validarID], eliminarUsuario)
  .put([validarToken, validarID, userValidacion], actualizarUsuario);

router.route("/login").post(iniciarSesion);
router.route("/logout").post(validarToken, cerrarSesion);

export default router;
