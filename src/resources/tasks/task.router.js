const router = require('express').Router();
const tasksService = require('./task.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    return res.status(200).json(tasks);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await tasksService.getTaskId(req.boardId, req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(task);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const task = await tasksService.editTask(
      req.boardId,
      req.params.id,
      req.body
    );
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
  catchErrors(async (req, res) => {
    const message = await tasksService.deleteTask(req.params.id);
    return res.status(200, 204).json({ message });
  })
);

module.exports = router;
