const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const authMiddleware = require('../auth/auth.middleware');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const charactersController = require('../characters/characters.controller');
const {
  validId,
  validObjectBody,
} = require('../characters/characters.middleware');

router.get('/', charactersController.findCharactersController);

router.get(
  '/search',
  authMiddleware,
  charactersController.findByNameController,
);

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

router.get('/find-by-name/:nome', charactersController.findByNameController);

router.delete(
  '/delete/:id',
  validId,
  charactersController.deleteCharacterController,
);

module.exports = router;
