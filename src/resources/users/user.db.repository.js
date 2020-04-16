// const User = require('./user.model');
const User = require('./user.model');

const getAll = async () => {
  const query = await User.find({});
  console.log(query);
  return query;
};

const getUserId = async userId => {
  return User.findOne({ _id: userId });
};

const addUser = async user => {
  return User.create(user);
};

const editUser = async (userId, user) => {
  return User.updateOne({ _id: userId }, user);
};

const deleteUser = async userId => {
  return User.deleteOne({ _id: userId });
};

module.exports = { getAll, getUserId, addUser, editUser, deleteUser };
