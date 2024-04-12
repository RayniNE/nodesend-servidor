const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./logger/index.js");

//Se crea el servidor
const app = express();

// ! Falsificación de Solicitudes del Lado del Servidor 
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

logger.info(`Opciones de CORS: ${opcionesCors}`);

app.use(bodyParser.json({ limit: "30mb", extendend: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extendend: true }));

// ! Falsificación de Solicitudes del Lado del Servidor )
app.use(cors(opcionesCors));
app.options("*", cors()); // enable pre-flight

logger.info("Cors inicializado");

//Se conecta a la base de datos.
conectarDB();
logger.info("Conexion con la DB realizado exitosamente");

//Habilitar la carpeta publica
app.use(express.static("uploads"));

//Puerto de la app
const port = process.env.PORT || 4000;

app.use(express.json());

logger.info("Registrando rutas...");

app.use("/api", require("./routes/usuarios"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/enlaces"));
app.use("/api", require("./routes/archivos"));

logger.info("Rutas registradas");

//Arranca la app.
app.listen(port, "0.0.0.0", () => {
  logger.info(`El servidor esta funcionando en el puerto ${port}`);
});
