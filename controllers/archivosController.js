const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Enlaces = require("../models/Enlace");
const logger = require("../logger/index");

exports.subirArchivo = async (request, response, next) => {
  logger.info("Subiendo archivo...");
  const configuracionMulter = {
    limits: {
      fileSize: request.usuario ? 1024 * 1024 * 100 : 1024 * 1024 * 10,
    },
    storage: (fileStorage = multer.diskStorage({
      destination: (request, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (request, file, cb) => {
        // const extension = file.mimetype.split('/')[1];
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length,
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  // response.json({msg: "Trabajo mmamaguebo"});
  upload(request, response, async (error) => {
    console.log(request.file);

    if (!error) {
      response.json({ archivo: request.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });

  logger.info(`Archivo: ${request.file.filename} subido exitosamente`);
};

exports.descargarArchivo = async (request, response, next) => {
  const enlace = await Enlaces.findOne({ nombre: archivo });

  logger.info(`Descargando archivos: ${archivo}`);

  const archivoDescarga = __dirname + "/../uploads/" + archivo;
  response.download(archivoDescarga);

  //Si las descargas son igual a 1 -> Se borra el archivo.
  const { descargas, nombre } = enlace;
  console.log(descargas);
  if (descargas === 1) {
    request.archivo = nombre;

    await Enlaces.findOneAndRemove(request.params.url);

    next();
  } else {
    enlace.descargas--;
    await enlace.save();
  }
};

exports.eliminarArchivo = async (request, response) => {
  try {
    logger.info(`Borrando archivo: ${archivo}`);

    fs.unlinkSync(__dirname + `/../uploads/${request.archivo}`);
    console.log("Se ha borrado exitosamente");
  } catch (error) {
    console.log(error);
  }
};
