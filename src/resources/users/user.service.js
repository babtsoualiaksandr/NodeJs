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
const findByToken = (token, cb) => {
  const records = getAll();
  console.log(records);
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      console.log(record, '===========================', token);
      if (record.password === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
module.exports = {
  getAll,
  getUserId,
  addUser,
  editUser,
  deleteUser,
  findByToken
};
