const express = require('express');
const Login = require('../controllers/login.controller.js');
const router = express.Router();

router.post('/login', Login);

module.exports = router;