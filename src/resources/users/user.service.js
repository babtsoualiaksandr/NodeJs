const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUserId = id => usersRepo.getUserId(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, user) => usersRepo.editUser(id, user);
const deleteUser = async id => {
  await usersRepo.deleteUser(id);
  await tasksService.nullTaskByUser(id);
};

module.exports = {
  getAll,
  getUserId,
  addUser,
  editUser,
  deleteUser
};
