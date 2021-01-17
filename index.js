const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Se crea el servidor
const app = express();

//Se conecta a la base de datos.
conectarDB();

const opcionesCors = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(opcionesCors));

//Habilitar la carpeta publica
app.use(express.static('uploads'));

//Puerto de la app
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', require('./routes/usuarios'));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/enlaces'));
app.use('/api', require('./routes/archivos'));

//Arranca la app.
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})