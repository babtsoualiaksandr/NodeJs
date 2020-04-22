const userServices = require('../users/user.service');

const isUser = (login, password) =>
  userServices.findOneByLogin(login, password);

module.exports = {
  isUser
};
