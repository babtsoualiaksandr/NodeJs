const Task = require('./task.model');
const getAll = async _boardId => {
  return Task.find({ boardId: _boardId });
};

const getTaskId = async (_boardId, taskId) => {
  return Task.findOne({ _id: taskId, boardId: _boardId });
};

const addTask = async (_boardId, task) => {
  return Task.create({ ...task, boardId: _boardId });
};

const editTask = async (_boardId, taskId, task) => {
  return Task.update({ _id: taskId, boardId: _boardId }, task);
};

const deleteTask = async taskId => {
  return (await Task.deleteOne({ _id: taskId })).deletedCount;
};

const deleteTaskByBoard = async _boardId => {
  const del = await Task.deleteMany({ boardId: _boardId }).exec();
  return del;
};

const nullTaskByUser = async _userId => {
  return Task.updateMany({ userId: _userId }, { userId: null });
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
