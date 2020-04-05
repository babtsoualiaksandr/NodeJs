// const User = require('./user.model');
let users = require('./mock').users;
const tasksService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = async () => {
  return users;
};

const getUserId = async id => {
  return users.find(user => user.id === id);
};

const addUser = async user => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const editUser = async (id, user) => {
  users.map(item => {
    if (item.id === id) {
      item.name = user.name;
      item.login = user.login;
      item.password = user.password;
    }
    return item;
  });
  return user;
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
  await tasksService.nullTaskByUser(id);
  return null;
};

module.exports = { getAll, getUserId, addUser, editUser, deleteUser };
