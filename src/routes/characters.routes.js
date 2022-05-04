const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const charactersController = require('../controllers/characters.controller');
const {
  validId,
  validObjectBody,
} = require('../middlewares/characters.middleware');

router.get('/', charactersController.findCharactersController);

router.get(
  '/find/:id',
  validId,
  charactersController.findCharactersByIdController,
);

router.post(
  '/create',
  validObjectBody,
  charactersController.addCharacterController,
);

router.put(
  '/update/:id',
  validId,
  validObjectBody,
  charactersController.updateCharacterController,
);

router.delete(
  '/delete/:id',
  validId,
  charactersController.deleteCharacterController,
);

module.exports = router;
