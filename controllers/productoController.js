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
  producto.nombre = req.body.nombre || producto.nombre;
  producto.tipo = req.body.tipo || producto.tipo;
  producto.material_apoyo = req.body.material_apoyo || producto.material_apoyo;
  producto.descripcion_extendida = req.body.descripcion_extendida || producto.descripcion_extendida;
  producto.cantidad_min = req.body.cantidad_min || producto.cantidad_min;
  producto.cantidad_max = req.body.cantidad_max || producto.cantidad_max;
  producto.existencias = req.body.existencias || producto.existencias;
  producto.alg = req.body.alg || producto.alg;
  producto.precio_ga = req.body.precio_ga || producto.precio_ga;
  producto.precio_default = req.body.precio_default || producto.precio_default;
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