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

//upload.single('imagen'), errorMulter,
router
  .route("/")
  .post([upload.single('imagenes'), errorMulter, productValidacion], agregarProductoNuevo)
  .get(listarProductos);
router
  .route("/:id")
  .get(validarID, obtenerProducto)
  .delete(validarID, deleteProducto)
  .put([validarID, productValidacion], editarProducto);

export default router;
