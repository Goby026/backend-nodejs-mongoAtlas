const { response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validarJWT = (req, res = response, next) => {
  // leer el token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    // console.log("[ID USUARIO]->", uid);

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  validarJWT,
};
