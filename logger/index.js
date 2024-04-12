const winston = require("winston");

// Implementación de registros detallados y monitoreo de eventos de seguridad
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "security.log" }),
  ],
});

module.exports = logger;
