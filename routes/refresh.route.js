const express = require('express');
const Refresh = require('../controllers/refresh.controller.js');
const router = express.Router();

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Dùng refresh token để lấy access token mới khi access token hết hạn.
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
 *                 description: Refresh token hợp lệ (đã cấp khi login).
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Trả về access token mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newAccessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Refresh token không hợp lệ
 */
router.post('/token', Refresh);

module.exports = router;