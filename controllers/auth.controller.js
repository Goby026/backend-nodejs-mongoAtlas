const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    //verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error de password",
      });
    }

    // generar el token -jwt
    const token = await generarJWT(usuarioDB.id);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
