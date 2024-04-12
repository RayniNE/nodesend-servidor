const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// Fallas de Identificación y Autenticación
module.exports = (request, response, next) => {
  const authHeader = request.get("Authorization");

  logger.info("Validando authorization header");

  if (authHeader) {
    //Obtener el token
    const token = authHeader.split(" ")[1];

    //Comprobar el JWT.
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      request.usuario = usuario;
      logger.info(`Usuario verificado: ${usuario}`);
    } catch (error) {
      console.log(error);
      console.log("JWT no valido");
    }
  }

  return next();
};
