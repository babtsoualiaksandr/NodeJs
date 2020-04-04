const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTaskId = (boardId, taskId) => tasksRepo.getTaskId(boardId, taskId);
const addTask = (boardId, task) => tasksRepo.addTask(boardId, task);
const editTask = (boardId, taskId, task) =>
  tasksRepo.editTask(boardId, taskId, task);
const deleteTask = taskId => tasksRepo.deleteTask(taskId);
const deleteTaskByBoard = boardId => tasksRepo.deleteTaskByBoard(boardId);
const nullTaskByUser = userId => tasksRepo.nullTaskByUser(userId);

module.exports = {
  getAll,
  getTaskId,
  addTask,
  editTask,
  deleteTask,
  deleteTaskByBoard,
  nullTaskByUser
};
