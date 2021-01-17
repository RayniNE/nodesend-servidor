const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })
        console.log("Se ha conectado exitosamente")
    } catch (error) {
        console.log("Error: ", error);
        process.exit(1);
    }

}

module.exports = conectarDB; 