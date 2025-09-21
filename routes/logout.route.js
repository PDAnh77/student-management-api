const express = require('express');
const Logout = require('../controllers/logout.controller.js');
const router = express.Router();

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     description: Hủy refresh token hiện tại để người dùng không thể dùng nó để lấy access token mới nữa.
 *     tags: [Xác thực]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token của người dùng.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Logout thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       403:
 *         description: Refresh token không hợp lệ
 */
router.post('/logout', Logout);

module.exports = router;