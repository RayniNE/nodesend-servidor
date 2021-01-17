const express = require('express');
const router = express.Router();
const { subirArchivo, descargarArchivo, eliminarArchivo } = require('../controllers/archivosController');


router.post('/archivos',
    subirArchivo
);

router.get('/archivos/:archivo',
    descargarArchivo,
    eliminarArchivo
)


module.exports = router;