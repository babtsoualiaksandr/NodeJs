const router = require('express').Router();
const loginService = require('../login/login.service');
const catchErrors = require('../../common/catchErrors');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../../common/config').JWT_SECRET_KEY;
const { userValidationLogin, validate } = require('../../common/validator');

router.route('/').post(
  userValidationLogin(),
  validate,
  catchErrors(async (req, res) => {
    const isUser = await loginService.isUser(req.body.login, req.body.password);
    console.log(req.body);
    if (!isUser) {
      throw createError(404, `User '${JSON.stringify(req.body)}' not found`);
    }
    const _token = jwt.sign({ login: isUser.login }, JWT_SECRET_KEY);
    return res.header('Authorization', _token).send({ token: _token });
  })
);

module.exports = router;
