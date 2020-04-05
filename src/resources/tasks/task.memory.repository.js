// const User = require('./user.model');
let tasks = require('./mock').tasks;
const Task = require('./task.model');
const getAll = async boardId => {
  return tasks.filter(item => item.boardId === boardId);
};

const getTaskId = async (boardId, taskId) => {
  return tasks.find(item => item.boardId === boardId && item.id === taskId);
};

const addTask = async (boardId, task) => {
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
  tasks = tasks.filter(task => task.id !== id);
  return 'Deleted';
};

const deleteTaskByBoard = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
  return 'Deleted';
};

const nullTaskByUser = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
};

module.exports = {
  getAll,
  getTaskId,
  addTask,
  editTask,
  deleteTask,
  deleteTaskByBoard,
  nullTaskByUser
};
