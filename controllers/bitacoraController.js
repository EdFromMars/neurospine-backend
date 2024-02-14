import Bitacora from "../models/Bitacora.js";

const agregarBitacora = async (req, res) => {
  const bitacora = new Bitacora(req.body);

  try {
    const bitacoraGuardada = await bitacora.save();
    res.json( bitacoraGuardada );
  } catch (error) {
    console.log(error);
  }
};

export { agregarBitacora };