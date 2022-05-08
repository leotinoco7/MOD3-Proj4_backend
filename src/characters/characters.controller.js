const mongoose = require('mongoose');
const charactersService = require('./characters.service');

const homeCharacterController = (req, res) => {
  res.send('index');
};

const findCharactersController = async (req, res) => {
  const allCharacters = await charactersService.findCharactersService();
  res.send(allCharacters);
};

const findByNameController = async (req, res) => {
  const { message } = req.query;

  const chars = await charactersService.findCharacterByNameService(message);

  if (chars.length === 0) {
    return res
      .status(404)
      .send({ message: 'não existem personagens com esse nome' });
  }

  return res.send({
    chars: chars.map((char) => ({
      id: char._id,
      nome: char.nome,
      desc: char.desc,
      foto: char.foto,
    })),
  });
};

const findCharactersByIdController = async (req, res) => {
  const idParam = req.params.id;

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );
  if (!chosenCharacter) {
    return res.status(404).send({ message: 'personagem não encontrado' });
  }
  res.send(chosenCharacter);
};

const addCharacterController = async (req, res) => {
  const character = req.body;

  const newCharacter = await charactersService.addCharacterService(character);
  res.send(newCharacter);
};

const updateCharacterController = async (req, res) => {
  const idParam = req.params.id;
  const characterEdit = req.body;

  const chosenCharacter = await charactersService.findCharacterByIdService(
    idParam,
  );

  if (!chosenCharacter) {
    return res.status(400).send({ message: 'faltam dados' });
  }

  const updatedCharacter = await charactersService.updateCharacterService(
    idParam,
    characterEdit,
  );
  res.send(updatedCharacter);
};

const deleteCharacterController = async (req, res) => {
  const idParam = req.params.id;

  const chosenCharacter = charactersService.findCharacterByIdService(idParam);

  if (!chosenCharacter) {
    return res.status(404).send({ message: 'personagem não encontrado!' });
  }

  await charactersService.deleteCharacterService(idParam);
  res.send({ message: 'personagem deletado com sucesso!' });
};

module.exports = {
  homeCharacterController,
  findCharactersController,
  findByNameController,
  findCharactersByIdController,
  addCharacterController,
  updateCharacterController,
  deleteCharacterController,
};
