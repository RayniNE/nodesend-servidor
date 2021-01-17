const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    }

});

module.exports = mongoose.model('usuarios', usuariosSchema);