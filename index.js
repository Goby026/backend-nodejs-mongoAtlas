const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

// crear el servidor
const app = express();

// configurar CORS
app.use(cors());

// base de datos
dbConnection();

/*RUTAS*/
app.get("/", function (req, res) {
  res.status(200).json({
    ok: true,
    msg: "Hola mundo",
  });
});

/*INICIAR SERVIDOR*/
app.listen(process.env.PORT, () => {
  console.log("server online " + process.env.PORT);
});

/*
gobydev
X7Y94g9qggcxAX5H
*/
