let boards = [
  {
    id: 'jggjhg hgjhg',
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
let tasks = require('../tasks/mock').tasks;
const Board = require('./board.model');
const getAll = async () => {
  return boards;
};

const getBoardId = async id => {
  return boards.find(board => board.id === id);
};

const addBoard = async board => {
  console.log('board +++++++++++++++', board);
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const editBoard = async (id, board) => {
  console.log('id', id);
  console.log('board', board);
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
  console.log('idididididididiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', id);
  boards = boards.filter(board => board.id !== id);
  console.log('#################', tasks, '###################');
  tasks = tasks.filter(task => task.boardId !== id);
  console.log('$$$$$$$$$$$$$$$$$', tasks, '$$$$$$$$$$$$$$$$$$$');
  return 'Deleted';
};

module.exports = { getAll, getBoardId, addBoard, editBoard, deleteBoard };
