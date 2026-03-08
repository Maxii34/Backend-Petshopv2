import { Router } from "express";
import {
  agregarProductoNuevo,
  deleteProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/product.controllers.js";
import productValidacion from "../middlewares/productosValidacion.js"

const router = Router();

router.route("/").post(productValidacion, agregarProductoNuevo).get(listarProductos);
router
  .route("/:id")
  .get(obtenerProducto)
  .delete(deleteProducto)
  .put(productValidacion, editarProducto);

export default router;
