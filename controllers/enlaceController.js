const Enlace = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (request, response, next) => {
    
    //Revisar si hay errores.
    const errores = validationResult(request);
    if(!errores.isEmpty()){
        return response.status(400).json({errores: errores.array()});
    }

    //Se crea el objeto de Enlace
    const { nombre_original, password, nombre} = request.body;

    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    enlace.password = password;

    //Si el usuario esta autenticado.

    if(request.usuario){

        // console.log(request.usuario);

        const { password, descargas } = request.body;

        //Asignar a enlace el numero de descargas.
        if(descargas){
            enlace.descargas = descargas;
        }

        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }

        enlace.autor = request.usuario.id

    }

    try {
        //Almacenar en la base de datos.
        await enlace.save();
        return response.json({enlace: enlace.url});
        next();
    } catch (error) {
        console.log(error);
    }

}

exports.todosEnlaces = async (request, response) => {

    try {
        const enlaces = await Enlace.find({}).select('url -_id');
        response.json({enlaces});
    } catch (error) {
        console.log(error);
    } 

}

exports.obtenerEnlace = async (request, response, next) => {

    const { url } = request.params;

    const enlace = await Enlace.findOne({url});

    if(!enlace){
        response.status(404).json({msg: "El enlace no existe"});
        return next();
    }

    //Si el enlace existe.
    response.json({archivo: enlace.nombre, password: false});

    next();


    //Si es mayor a 1 --> Se resta uno.
};

exports.tienePassword = async (request, response, next) => {

    const { url } = request.params;

    const enlace = await Enlace.findOne({url});

    if(!enlace){
        response.status(404).json({msg: "El enlace no existe"});
        return next();
    }

    if(enlace.password){
        return response.json({password: true, enlace: enlace.url})
    }

    next();

}

exports.verificarPassword = async (request, response, next) => {

    const { url } = request.params;
    const { password } = request.body;

    //consultar por el enlace.
    const enlace = await Enlace.findOne({url});

    //Verificar el password.
    if(bcrypt.compareSync(password, enlace.password)){
        next();
    } else{
        return response.status(401).json({msg: 'Password incorrecto'});
    }

}