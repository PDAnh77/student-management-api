const express = require('express');
const Signup = require('../controllers/signup.controller.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Đăng ký
 *     description: Tạo tài khoản người dùng mới
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Đăng ký]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [student, teacher]
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *       400:
 *         description: Tài khoản đã tồn tại hoặc dữ liệu không hợp lệ
 */

router.post('/signup', Signup);

module.exports = router;