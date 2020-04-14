// const User = require('./user.model');
const User = require('./user.model');

const getAll = async () => {
  const query = await User.find({});
  console.log(query);
  return query;
};

const getUserId = async id => {
  return User.findOne({ _id: id });
};

const addUser = async user => {
  return User.create(user);
};

const editUser = async (id, user) => {
  return User.updateOne({ _id: id }, user);
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, getUserId, addUser, editUser, deleteUser };
