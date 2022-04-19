const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Animais = Schema({
  nome: { type: String, required: true },
  especie: { type: String, required: true },
  sexo: { type: String, required: true },
});

module.exports = mongoose.model("Animais", Animais);
