const router = require('express').Router();
const taskRouter = require('../tasks/task.router.js');
// const Board = require('./board.model');
const boardsService = require('./board.service');
// const ExpressData = require('./../../common/express-data');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  console.log(boards);
  return res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardId(req.params.id);
  if (!board) {
    return res.status(404).json({ message: 'not found' });
  }
  return res.status(200).json(board);
});

router.route('/:id').put(async (req, res) => {
  console.log('id router', req.params.id);
  const board = await boardsService.editBoard(req.params.id, req.body);
  return res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  console.log(req.body);
  const board = await boardsService.addBoard(req.body);
  return res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const message = await boardsService.deleteBoard(req.params.id);
  return res.status(200, 204).json({ message });
});

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
