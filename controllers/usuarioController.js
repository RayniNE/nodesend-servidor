const User = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.crearUsuario = async (request, response) => {
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json({ errores: errores.array() });
  }

  const { email, password } = request.body;

  // ! Fallas en el Software e Integridad, al usar el Models de User, se sanatiza el query.
  let usuario = await User.findOne({ email });

  //Se verifica si el usuario ya existe.
  if (usuario) {
    return response.status(400).json({ error: "El usuario ya existe" });
  }

  usuario = new User(request.body);

  //Se hashea el password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    await usuario.save();
    response.json({ msg: "Se ha creado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
