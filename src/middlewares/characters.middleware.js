const mongoose = require('mongoose');

const validId = (req, res, next) => {
  const idParam = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    return res.status(400).send({ message: 'Id inválido!' });
  }
  next();
};

const validObjectBody = (req, res, next) => {
  const character = req.body;
  if (!character || !character.nome || !character.desc || !character.foto) {
    return res.status(400).send({ message: 'faltam campos' });
  }
  next();
};

module.exports = {
  validId,
  validObjectBody,
};
