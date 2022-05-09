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
  '/find/:id',
  authMiddleware,
  validId,
  charactersController.findCharactersByIdController,
);

router.post(
  '/create',
  authMiddleware,
  validObjectBody,
  charactersController.addCharacterController,
);

router.put(
  '/update/:id',
  authMiddleware,
  validId,
  validObjectBody,
  charactersController.updateCharacterController,
);

router.get(
  '/find-by-name/:nome',
  authMiddleware,
  charactersController.findByNameController,
);

router.delete(
  '/delete/:id',
  authMiddleware,
  validId,
  charactersController.deleteCharacterController,
);

module.exports = router;
