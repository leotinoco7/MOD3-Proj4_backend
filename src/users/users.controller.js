const userService = require('./users.service');
const authService = require('../auth/auth.service');

const createUserController = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).send({
      message: 'algum campo faltando',
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: 'usuario ja existe',
    });
  }

  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err, message));

  if (!user) {
    return res.status(400).send({
      message: 'erro',
    });
  }

  const token = await authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
    },
    token,
  });
};

const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.length === 0) {
    return res.status(400).send({
      message: 'nenhum usuario cadastrado',
    });
  }

  res.send(users);
};

module.exports = { createUserController, findAllUserController };
