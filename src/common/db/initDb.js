const User = require('../../resources/users/user.model');
const Board = require('../../resources/boards/board.model');
const Task = require('../../resources/tasks/task.model');
const mongoose = require('mongoose');
const users = [
  new User({
    name: 'User One Admin for Test',
    login: 'admin',
    password: 'admin'
  }),
  new User({
    name: 'User two not Admin',
    login: 'Login',
    password: '1q2w3e4r'
  })
];

const boards = [
  new Board({
    title: 'Title',
    columns: [
      { title: 'Title Column', order: 1 },
      { title: 'Title Column', order: 2 }
    ]
  }),
  new Board({
    title: 'Title',
    columns: [
      { title: 'Title Column', order: 1 },
      { title: 'Title Column', order: 0 }
    ]
  })
];

const tasks = [
  new Task({
    title: 'title',
    order: 1,
    description: '',
    userId: 'userId', // assignee
    boardId: '1',
    columnId: 'columnId'
  }),
  new Task({
    title: 'title',
    order: 2,
    description: '',
    userId: 'a092f06e-da82-47c7-87cf-affdab31f3c0', // assignee
    boardId: '1',
    columnId: 'colomnId'
  }),
  new Task({
    title: 'title Task',
    order: 3,
    description: 'description Task',
    userId: 'a092f06e-da82-47c7-87cf-affdab31f3c0', // assignee
    boardId: 'board Id',
    columnId: 'column Id'
  })
];

const initDb = async () => {
  mongoose.connection.collection('users').drop();
  mongoose.connection.collection('boards').drop();
  mongoose.connection.collection('tasks').drop();

  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  tasks.forEach(task => task.save());
};

module.exports = initDb;
