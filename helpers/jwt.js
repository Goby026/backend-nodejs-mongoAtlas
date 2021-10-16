const jwt = require("jsonwebtoken");

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el JWT", err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
