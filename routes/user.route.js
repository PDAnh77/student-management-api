const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userid', getUserById);
router.put('/users/:userid', updateUser);
router.delete('/users/:userid', deleteUser);

module.exports = router;