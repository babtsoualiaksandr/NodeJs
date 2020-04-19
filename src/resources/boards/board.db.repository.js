const Board = require('./board.model');
const getAll = async () => {
  return Board.find({});
};

const getBoardId = async boardId => {
  return Board.findOne({ _id: boardId });
};

const addBoard = async board => {
  return Board.create(board);
};

const editBoard = async (boardId, board) => {
  return Board.update({ _id: boardId }, board);
};

const deleteBoard = async boardId => {
  return Board.deleteOne({ _id: boardId });
};

module.exports = { getAll, getBoardId, addBoard, editBoard, deleteBoard };
