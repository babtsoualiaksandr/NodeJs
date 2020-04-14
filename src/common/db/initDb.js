const User = require('../../resources/users/user.model');
const mongoose = require('mongoose');
const users = [
  new User({
    name: 'User 0',
    login: 'Login 0',
    password: '1q2w3e4r'
  }),
  new User({
    name: 'User 1',
    login: 'Login 323',
    password: '1q2w3e4r'
  })
];

const initDb = () => {
  if (mongoose.connection.collection('users')) {
    mongoose.connection.collection('users').drop();
  }
  users.forEach(user => user.save());
};

module.exports = initDb;
