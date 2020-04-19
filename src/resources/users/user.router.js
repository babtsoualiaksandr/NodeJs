const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../common/catchErrors');
const createError = require('http-errors');
const {
  userValidationBody,
  ValidationIdUuid,
  validate
} = require('../../common/validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    return res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const user = await usersService.getUserId(req.params.id);
    if (!user) {
      throw createError(404, `User '${req.params.id}' not found`);
    }
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  ValidationIdUuid(),
  userValidationBody(),
  validate,
  catchErrors(async (req, res) => {
    const isUser = await usersService.getUserId(req.params.id);
    if (!isUser) {
      throw createError(404, `User '${req.params.id}' not found`);
    }
    const user = await usersService.editUser(req.params.id, req.body);
    return res.status(200).json(user);
  })
);

router.route('/').post(
  userValidationBody(),
  validate,
  catchErrors(async (req, res) => {
    const user = await usersService.addUser(req.body);
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const message = await usersService.deleteUser(req.params.id);
    return res.status(204).json({ message });
  })
);

module.exports = router;
