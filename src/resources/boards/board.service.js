const boardRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();
const getBoardId = id => boardRepo.getBoardId(id);
const addBoard = board => boardRepo.addBoard(board);
const editBoard = (id, board) => boardRepo.editBoard(id, board);
const deleteBoard = async id => {
  await boardRepo.deleteBoard(id);
  await tasksService.deleteTaskByBoard(id);
};
module.exports = { getAll, getBoardId, addBoard, editBoard, deleteBoard };
