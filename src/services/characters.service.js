const Character = require('../models/Characters');

const findCharactersService = async () => {
  const characters = await Character.find();
  return characters;
};

const findCharacterByIdService = async (id) => {
  const character = await Character.findById(id);
  return character;
};

const addCharacterService = async (newCharacter) => {
  const characterCriado = await Character.create(newCharacter);
  return characterCriado;
};

const updateCharacterService = async (id, characterEdited) => {
  const characterAtualizado = await Character.findByIdAndUpdate(
    id,
    characterEdited,
  );
  return [characterAtualizado, characterEdited];
};

const deleteCharacterService = async (id) => {
  return await Character.findByIdAndDelete(id);
};

module.exports = {
  findCharactersService,
  findCharacterByIdService,
  addCharacterService,
  updateCharacterService,
  deleteCharacterService,
};
