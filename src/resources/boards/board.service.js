const boardRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();
const getBoardId = id => boardRepo.getBoardId(id);
const addBoard = board => boardRepo.addBoard(board);
const editBoard = (id, board) => boardRepo.editBoard(id, board);
const deleteBoard = id => {
  tasksService.deleteTaskByBoard(id);
  boardRepo.deleteBoard(id);
};
module.exports = { getAll, getBoardId, addBoard, editBoard, deleteBoard };
