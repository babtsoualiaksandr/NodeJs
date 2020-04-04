const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserId = id => usersRepo.getUserId(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, user) => usersRepo.editUser(id, user);
const deleteUser = id => usersRepo.deleteUser(id);
module.exports = { getAll, getUserId, addUser, editUser, deleteUser };
