const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Người dùng
 *     description: Quản lý thông tin người dùng
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Người dùng]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */

/**
 * @swagger
 * /users/{userid}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [Người dùng]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Người dùng]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [Người dùng]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */

router.get('/users', getUsers);
router.get('/users/:userid', getUserById);
router.put('/users/:userid', updateUser);
router.delete('/users/:userid', deleteUser);

module.exports = router;