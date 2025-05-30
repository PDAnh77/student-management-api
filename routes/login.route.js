const express = require('express');
const Login = require('../controllers/login.controller.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Xác thực
 *     description: Đăng nhập và xử lý xác thực người dùng
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Xác thực]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token hoặc thông tin người dùng
 *       401:
 *         description: Sai tên đăng nhập hoặc mật khẩu
 */

router.post('/login', Login);

module.exports = router;