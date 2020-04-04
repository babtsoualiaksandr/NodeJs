const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.boardId);
  return res.status(200).json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getTaskId(req.boardId, req.params.id);
  console.log('task  ', task);
  if (!task) {
    console.log('not found ', task);
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(task);
});

router.route('/:id').put(async (req, res) => {
  console.log('id router', req.params.id);
  const task = await tasksService.editTask(
    req.boardId,
    req.params.id,
    req.body
  );
  return res.status(200).json(task);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.addTask(req.boardId, req.body);
  return res.status(200).json(task);
});

router.route('/:id').delete(async (req, res) => {
  const message = await tasksService.deleteTask(req.params.id);
  return res.status(200, 204).json({ message });
});

module.exports = router;
