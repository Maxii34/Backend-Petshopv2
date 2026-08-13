import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import productRepository from "../repository/product.repository.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

const agregarProducto = async (datosProducto, files) => {
  if (!files?.imagenes || files.imagenes.length === 0) {
    throw new ValidationError("Debes enviar al menos una imagen del producto");
  }

  const imagenes = [];

  for (const file of files.imagenes) {
    const resultado = await subirImagenCloudinary(file.buffer);
    imagenes.push(resultado.secure_url);
  }

  datosProducto.imagenes = imagenes;

  return await productRepository.crearProducto(datosProducto);
};

const obtenerTodosLosProductosService = async () => {
  return await productRepository.obtenerTodosLosProductos();
};

const listarProductosFiltrados = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const busqueda = query.busqueda || "";

  const filtros = {};

  if (busqueda) {
    filtros.$or = [
      { nombre: { $regex: busqueda, $options: "i" } },
      { descripcion: { $regex: busqueda, $options: "i" } },
      { marca: { $regex: busqueda, $options: "i" } },
    ];
  }

  if (query.categoria) {
    filtros.categoria = query.categoria;
  }

  if (query.tipoAnimal) {
    filtros.tipoAnimal = query.tipoAnimal;
  }

  if (query.enOferta === "true") {
    filtros.enOferta = true;
  }

  if (query.precioMin || query.precioMax) {
    filtros.precio = {};

    if (query.precioMin) {
      filtros.precio.$gte = parseFloat(query.precioMin);
    }

    if (query.precioMax) {
      filtros.precio.$lte = parseFloat(query.precioMax);
    }
  }

  const totalProductos = await productRepository.contarProductos(filtros);

  const totalPages = Math.ceil(totalProductos / limit);

  const products = await productRepository.obtenerProductosFiltrados(
    filtros,
    skip,
    limit,
  );

  return {
    data: products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProductos,
      productosEnPagina: products.length,
      hasMore: page < totalPages,
    },
  };
};

const obtenerProducto = async (id) => {
  const producto = await productRepository.obtenerProductoPorId(id);

  if (!producto) {
    throw new NotFoundError("Producto no encontrado");
  }

  return producto;
};

const eliminarProducto = async (id) => {
  const producto = await productRepository.eliminarProductoPorId(id);

  if (!producto) {
    throw new NotFoundError("Producto no encontrado");
  }

  return producto;
};

const editarProducto = async (id, datosProducto, file) => {
  const producto = await productRepository.obtenerProductoPorId(id);

  if (!producto) {
    throw new NotFoundError("Producto no encontrado");
  }

  if (file) {
    const resultado = await subirImagenCloudinary(file.buffer);
    producto.imagenes = resultado.secure_url;
  }

  producto.nombre = datosProducto.nombre;
  producto.descripcion = datosProducto.descripcion;
  producto.precio = datosProducto.precio;
  producto.categoria = datosProducto.categoria;
  producto.stock = datosProducto.stock;
  producto.marca = datosProducto.marca;
  producto.tipoAnimal = datosProducto.tipoAnimal;
  producto.detalles = datosProducto.detalles;
  producto.enOferta = datosProducto.enOferta;
  producto.descuento = datosProducto.descuento;
  producto.esNuevo = datosProducto.esNuevo;
  producto.destacado = datosProducto.destacado;
  producto.ingrediente = datosProducto.ingrediente;
  producto.caracteristica = datosProducto.caracteristica;

  return await productRepository.actualizarProducto(producto);
};

export default {
  agregarProducto,
  obtenerTodosLosProductosService,
  listarProductosFiltrados,
  obtenerProducto,
  eliminarProducto,
  editarProducto,
};
