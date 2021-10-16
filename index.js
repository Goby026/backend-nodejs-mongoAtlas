const express = require("express");
require("dotenv").config();
const cors = require("cors");
const usuarios_routes = require("./routes/usuarios.route");
const auth_routes = require("./routes/auth.route");

const { dbConnection } = require("./database/config");

// crear el servidor
const app = express();

// configurar CORS
app.use(cors());

// configurar lectura y parseo del body
app.use(express.json());

// base de datos
dbConnection();

/*RUTAS*/
app.use("/api/usuarios", usuarios_routes);
app.use("/api/login", auth_routes);

// app.get("/", function (req, res) {
//   res.status(200).json({
//     ok: true,
//     msg: "Hola mundo",
//   });
// });

/*INICIAR SERVIDOR*/
app.listen(process.env.PORT, () => {
  console.log("server online " + process.env.PORT);
});

/*
mongodb+srv://gobydev:<password>@cluster0.a5mny.mongodb.net/test

gobydev
X7Y94g9qggcxAX5H
*/
