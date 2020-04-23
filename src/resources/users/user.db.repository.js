const User = require('./user.model');

const getAll = async () => {
  const query = await User.find({});
  console.log(query);
  return query;
};

const getUserId = async userId => {
  return User.findOne({ _id: userId });
};

const findOneByLogin = async _login => {
  return User.findOne({ login: _login });
};

const addUser = async user => {
  return User.create(user);
};

const editUser = async (userId, user) => {
  return User.findOneAndUpdate({ _id: userId }, user, {
    new: true
  });
};

const deleteUser = async userId => {
  return User.deleteOne({ _id: userId });
};

const isUser = async (_login, _password) => {
  return User.findOne({ login: _login, password: _password });
};

module.exports = {
  getAll,
  getUserId,
  addUser,
  editUser,
  deleteUser,
  isUser,
  findOneByLogin
};
