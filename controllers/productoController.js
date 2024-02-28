import Producto from "../models/Producto.js";

const agregarProducto = async (req, res) => {
  const producto = new Producto(req.body);
  
  try {
    const productoGuardado = await producto.save();
    res.json(productoGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProductos = async (req, res) => {
  const productos = await Producto.find({});
  res.json(productos);
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  if(!producto) {
    return res.status(404).json({ msg: 'Producto no encontrado' });
  }

  if(producto._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  res.json(producto);
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  if(!producto) {
    return res.status(404).json({ msg: 'Producto no encontrado' });
  }

  if(producto._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  //Actualizar Producto
  producto.nombreMaterial = req.body.nombreMaterial || producto.nombreMaterial;
  producto.tipoMaterial = req.body.tipoMaterial || producto.tipoMaterial;
  producto.materialApoyo = req.body.materialApoyo || producto.materialApoyo;
  producto.descripcionExtendida = req.body.descripcionExtendida || producto.descripcionExtendida;
  producto.cantidadMin = req.body.cantidadMin || producto.cantidadMin;
  producto.cantidadMax = req.body.cantidadMax || producto.cantidadMax;
  producto.existencias = req.body.existencias || producto.existencias;
  producto.alg = req.body.alg || producto.alg;
  producto.precioAngeles = req.body.precioAngeles || producto.precioAngeles;
  producto.precioEstandar = req.body.precioEstandar || producto.precioEstandar;
  producto.materialPrincipal = req.body.materialPrincipal || producto.materialPrincipal;
  producto.usuario = req.body.usuario || producto.usuario;

  try {
    const productoActualizado = await producto.save();
    res.json(productoActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  if(!producto) {
    return res.status(404).json({ msg: 'Producto no encontrado' });
  }

  if(producto._id.toString() !== req.params.id.toString()) {
    return res.status(401).json({ msg: 'No autorizado' });
  }

  try {
    await producto.deleteOne();
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    console.log(error);
  }
};

export { 
  agregarProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
};