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

const router = Router();

router
  .route("/")
  .post(productValidacion, agregarProductoNuevo)
  .get(listarProductos);
router
  .route("/:id")
  .get(validarID, obtenerProducto)
  .delete(validarID, deleteProducto)
  .put([validarID, productValidacion], editarProducto);

export default router;
