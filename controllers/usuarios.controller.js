const { response } = require("express");
const Usuario = require("../models/usuario.model");

const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

// read
const getUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email imagen rol google");
    res.status(200).json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

// create
const saveUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "email indicado ya existe",
      });
    }
    const usuario = new Usuario(req.body);

    // encriptar constraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // generar el token -jwt
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

// update
const updateUsuario = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  // const { nombre, email } = req.body;

  try {
    const usuarioDB = await Usuario.findById(id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "ID de usuario inválido",
      });
    }

    // separar password, google y email de los campos que llegan en el body
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email != email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    // {new:true} es para devolver el usuario actualizado al momento de hacer el update
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//  delete
const deleteUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "ID de usuario inválido",
      });
    }

    // separar password, google y email de los campos que llegan en el body
    // const { password, google, email, ...campos } = req.body;

    // if (usuarioDB.email != email) {
    //   const existeEmail = await Usuario.findOne({ email });
    //   if (existeEmail) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: "Ya existe un usuario con ese email",
    //     });
    //   }
    // }

    // campos.email = email;

    // {new:true} es para devolver el usuario actualizado al momento de hacer el update
    await Usuario.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      // usuarioActualizado,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

// returns
module.exports = {
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
};
