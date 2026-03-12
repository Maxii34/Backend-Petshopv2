import { Router } from "express";
import {
  agregarProductoNuevo,
  deleteProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/product.controllers.js";
import productValidacion from "../middlewares/productosValidacion.js";
import validarID from "../middlewares/validacionID.js";
import upload from "../helpers/upload.js"
import errorMulter from "../middlewares/errorMulter.js"

const router = Router();

router
  .route("/")
  .post([upload.fields([{ name: 'imagenes', maxCount: 10 }]), errorMulter, productValidacion], agregarProductoNuevo)
  .get(listarProductos);
router
  .route("/:id")
  .get(validarID, obtenerProducto)
  .delete(validarID, deleteProducto)
  .put([validarID, productValidacion], editarProducto);

export default router;