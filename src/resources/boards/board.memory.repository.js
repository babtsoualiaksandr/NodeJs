let boards = [
  {
    id: '1',
    title: 'Title',
    columns: [
      { id: 'jhghgjh kjhjk ', title: 'Title Column', order: 1 },
      { id: 'jhghgjh kjhjk ', title: 'Title Column', order: 2 }
    ]
  },
  {
    id: 'yyhghjg hgj',
    title: 'Title',
    columns: [
      { id: 'jhghgjh kjhjk ', title: 'Title Column', order: 1 },
      { id: 'jhghgjh kjhjk ', title: 'Title Column', order: 0 }
    ]
  }
];

const Board = require('./board.model');
const getAll = async () => {
  return boards;
};

const getBoardId = async id => {
  return boards.find(board => board.id === id);
};

const addBoard = async board => {
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const editBoard = async (id, board) => {
  boards.map(item => {
    if (item.id === id) {
      item.title = board.title;
      item.columns = board.columns;
    }
    return item;
  });
  return board;
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
  return 'Deleted';
};

module.exports = { getAll, getBoardId, addBoard, editBoard, deleteBoard };
