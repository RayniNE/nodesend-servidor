const express = require('express');
const router = express.Router();
const { nuevoEnlace, obtenerEnlace, todosEnlaces, tienePassword, verificarPassword } = require('../controllers/enlaceController');
const { eliminarArchivo } = require('../controllers/archivosController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

router.post('/enlaces',
    [
        check("nombre_original", 'Sube un archivo').not().isEmpty(),
        check("nombre", 'Sube un archivo').not().isEmpty()
    ],
    auth,
    nuevoEnlace
);

router.get('/enlaces',
    todosEnlaces
)

router.get('/enlaces/:url',
    tienePassword,
    obtenerEnlace
)

router.post('/enlaces/:url',
    verificarPassword,
    obtenerEnlace
)

module.exports = router;