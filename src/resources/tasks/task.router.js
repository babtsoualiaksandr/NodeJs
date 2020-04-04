const router = require('express').Router();
// const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const boardId = req.boardId;
  console.log(boardId);
  console.log('************************* Roter ****************************');
  const tasks = await tasksService.getAll(req.boardId);
  return res.status(200).json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getTaskId(req.boardId, req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'not found' });
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
  console.log('create task ++++++++++++++Router++++++++++++', req.body);
  console.log(req.boardId);
  const task = await tasksService.addTask(req.boardId, req.body);
  console.log(task);
  console.log('create task ++++++++++++++Router++++++++++++', req.body);
  return res.status(200).json(task);
});

router.route('/:id').delete(async (req, res) => {
  const message = await tasksService.deleteTask(req.params.id);
  return res.status(200, 204).json({ message });
});

module.exports = router;
