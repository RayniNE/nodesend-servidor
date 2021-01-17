const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/usuarioController');
const { check } = require('express-validator');

router.post('/usuarios',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email validor').isEmail(),
    check('password', 'El password debe de ser de al menos 6 caracteres').isLength({min: 6})
], crearUsuario);

module.exports = router;