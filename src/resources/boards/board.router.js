const router = require('express').Router();
const taskRouter = require('../tasks/task.router.js');
const boardsService = require('./board.service');
const catchErrors = require('../../common/catchErrors');
const createError = require('http-errors');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  return res.status(200).json(boards);
});

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getBoardId(req.params.id);
    if (!board) {
      throw createError(404, `Board '${req.params.id}' not found`);
    }
    return res.status(200).json(board);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.editBoard(req.params.id, req.body);
    if (!board) {
      throw createError(404, `Board '${req.params.id}' not found`);
    }
    return res.status(200).json(board);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    return res.status(200).json(board);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const message = await boardsService.deleteBoard(req.params.id);
    return res.status(204).json({ message });
  })
);

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
