const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  return res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserId(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'not found' });
  }
  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.editUser(req.params.id, req.body);
  return res.status(200).json(user);
});

router.route('/').post(async (req, res) => {
  const user = await usersService.addUser(req.body);
  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const message = await usersService.deleteUser(req.params.id);
  return res.status(204).json({ message });
});

module.exports = router;
