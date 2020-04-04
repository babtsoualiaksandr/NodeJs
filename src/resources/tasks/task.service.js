const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTaskId = (boardId, taskId) => tasksRepo.getTaskId(boardId, taskId);
const addTask = (boardId, task) => tasksRepo.addTask(boardId, task);
const editTask = (boardId, taskId, task) =>
  tasksRepo.editTask(boardId, taskId, task);
const deleteTask = id => tasksRepo.deleteTask(id);
module.exports = { getAll, getTaskId, addTask, editTask, deleteTask };
