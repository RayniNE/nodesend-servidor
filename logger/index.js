const winston = require("winston");

// ! Fallas en el Registro y Monitoreo
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "security.log" }),
  ],
});

module.exports = logger;
