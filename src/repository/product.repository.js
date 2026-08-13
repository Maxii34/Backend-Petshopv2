import Product from "../models/product.js";

const crearProducto = async (datosProducto) => {
  const nuevoProducto = new Product(datosProducto);
  return await nuevoProducto.save();
};

const obtenerTodosLosProductos = async () => {
  return await Product.find();
};

const contarProductos = async (filtros) => {
  return await Product.countDocuments(filtros);
};

const obtenerProductosFiltrados = async (filtros, skip, limit) => {
  return await Product.find(filtros)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

const obtenerProductoPorId = async (id) => {
  return await Product.findById(id);
};

const eliminarProductoPorId = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const actualizarProducto = async (producto) => {
  return await producto.save();
};

export default {
  crearProducto,
  obtenerTodosLosProductos,
  contarProductos,
  obtenerProductosFiltrados,
  obtenerProductoPorId,
  eliminarProductoPorId,
  actualizarProducto,
};