const userRepo = require('../users/user.db.repository');

const isUser = (login, password) => userRepo.isUser(login, password);

module.exports = {
  isUser
};
