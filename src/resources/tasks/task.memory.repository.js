// const User = require('./user.model');
let tasks = require('./mock').tasks;
const Task = require('./task.model');
const getAll = async boardId => {
  console.log('tasks !!!!!!!!!!!!!!!repo!!!!!!!!!!!!!!', tasks);
  return tasks.filter(item => item.boardId === boardId);
};

const getTaskId = async (boardId, taskId) => {
  return tasks.find(item => item.boardId === boardId && item.id === taskId);
};

const addTask = async (boardId, task) => {
  console.log('--------------------repo------------------------');
  console.log('create TASK', boardId, 'task = ', task);
  const newTask = new Task({ ...task, boardId });
  tasks.push(newTask);
  return newTask;
};

const editTask = async (boardId, taskId, task) => {
  tasks.map(item => {
    if (item.boardId === boardId && item.id === taskId) {
      item.columnId = task.columnId;
      item.description = task.description;
      item.order = task.order;
      item.title = task.title;
      item.userId = task.userId;
    }
    return item;
  });
  return task;
};

const deleteTask = async id => {
  tasks = tasks.filter(user => user.id !== id);
  return 'Deleted';
};

module.exports = { getAll, getTaskId, addTask, editTask, deleteTask };
