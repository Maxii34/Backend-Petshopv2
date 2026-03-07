import { Router } from "express";
import {
  agregarProductoNuevo,
  deleteProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/product.controllers.js";

const router = Router();

router.route("/").post(agregarProductoNuevo).get(listarProductos);
router
  .route("/:id")
  .get(obtenerProducto)
  .delete(deleteProducto)
  .put(editarProducto);

export default router;
