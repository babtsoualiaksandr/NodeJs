const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../common/catchErrors');
const createError = require('http-errors');
const validator = require('validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    return res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    if (!validator.isUUID(req.params.id)) {
      throw createError(400, `User ID'${req.params.id}' not UUID`);
    }
    const user = await usersService.getUserId(req.params.id);
    if (!user) {
      throw createError(404, `User '${req.params.id}' not found`);
    }
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    if (!validator.isUUID(req.params.id)) {
      throw createError(400, `User ID'${req.params.id}' not UUID`);
    }
    const isUser = await usersService.getUserId(req.params.id);
    if (!isUser) {
      throw createError(404, `User '${req.params.id}' not found`);
    }
    const user = await usersService.editUser(req.params.id, req.body);
    return res.status(200).json(user);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.addUser(req.body);
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (!validator.isUUID(req.params.id)) {
      throw createError(400, `User ID'${req.params.id}' not UUID`);
    }
    const message = await usersService.deleteUser(req.params.id);

    return res.status(204).json({ message });
  })
);

module.exports = router;
