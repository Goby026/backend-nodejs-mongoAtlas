const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

// controladores
const {
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarios.controller");

/*RUTAS*/

// listar
router.get("/", validarJWT, getUsuarios);

// registrar
router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    validarCampos,
  ],
  saveUsuario
);

// actualizar
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("password", "El password es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    check("role", "El rol es requerido").not().isEmpty(),
    validarCampos,
  ],
  updateUsuario
);

// borrar
router.delete("/:id", validarJWT, deleteUsuario);

module.exports = router;
