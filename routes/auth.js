const express = require('express');
const router = express.Router();
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

router.post('/auth',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password no debe ir vacio').not().isEmpty()
    ],
 
    autenticarUsuario);

router.get('/auth',
    auth,    
    usuarioAutenticado);

module.exports = router;