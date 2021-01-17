const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (request, response, next) => {

    //Revisar si hay errores.
    const errores = validationResult(request);
    if(!errores.isEmpty()){
        return response.status(400).json({errores: errores.array()});
    }

    //Buscar si el usuario existe.
    const { email, password } = request.body;
    
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        response.status(401).json({msg: 'El usuario no existe'});
        return next();
    }

    //Se comprueba si al contraseña es correcta.

    if(bcrypt.compareSync(password, usuario.password)){
        
        //Se crea el JWT.
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        response.json({token});

    } else{
        response.status(401).json({msg: 'Password incorrecto'});
        return next();
    }

}

exports.usuarioAutenticado = (request, response, next) => {


    response.json({usuario: request.usuario});

}