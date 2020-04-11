const router = require('express').Router();
const tasksService = require('./task.service');
const catchErrors = require('../../common/catchErrors');
const createError = require('http-errors');
const { ValidationIdUuid, validate } = require('../../common/validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    return res.status(200).json(tasks);
  })
);

router.route('/:id').get(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const task = await tasksService.getTaskId(req.boardId, req.params.id);
    if (!task) {
      throw createError(404, `Task '${req.params.id}' not found`);
    }
    return res.status(200).json(task);
  })
);

router.route('/:id').put(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const task = await tasksService.editTask(
      req.boardId,
      req.params.id,
      req.body
    );
    if (!task) {
      throw createError(404, `Task '${req.params.id}' not found`);
    }
    return res.status(200).json(task);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await tasksService.addTask(req.boardId, req.body);
    return res.status(200).json(task);
  })
);

router.route('/:id').delete(
  ValidationIdUuid(),
  validate,
  catchErrors(async (req, res) => {
    const message = await tasksService.deleteTask(req.params.id);
    if (!message) {
      throw createError(404, `Task '${req.params.id}' not found`);
    }
    return res.status(204).json({ message });
  })
);

module.exports = router;
