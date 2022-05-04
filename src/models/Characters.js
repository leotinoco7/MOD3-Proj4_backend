const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  desc: { type: String, required: true },
  foto: { type: String, required: true },
});

const Character = mongoose.model('characters', CharacterSchema);

module.exports = Character;
