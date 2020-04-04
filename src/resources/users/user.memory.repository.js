// const User = require('./user.model');
let users = require('./mock').users;
const tasks = require('../tasks/mock').tasks;
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
  console.log('id', id);
  console.log('user', user);
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
  tasks.map(task => {
    if (task.userId === id) task.userId = null;
    return task;
  });
  console.log('---------------------------', tasks.length);
  return 'Deleted';
};

module.exports = { getAll, getUserId, addUser, editUser, deleteUser };
