const express = require('express');
const { getClasses,
    getClassesByUserId,
    getClassByIdentifier,
    createClass,
    joinClass,
    leaveClass,
    updateClass,
    deleteClass } = require('../controllers/class.controller.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Lớp học
 *     description: Quản lý lớp học và học sinh tham gia lớp
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Lấy danh sách tất cả lớp học
 *     tags: [Lớp học]
 *     responses:
 *       200:
 *         description: Trả về danh sách lớp học
 *   post:
 *     summary: Tạo lớp học mới
 *     tags: [Lớp học]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               creatorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lớp học được tạo thành công
 */

/**
 * @swagger
 * /classes/user/{userId}:
 *   get:
 *     summary: Lấy danh sách lớp học mà người dùng tham gia
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về danh sách lớp học của người dùng
 */

/**
 * @swagger
 * /classes/{identifier}:
 *   get:
 *     summary: Lấy thông tin lớp học theo ID hoặc mã lớp
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: ID hoặc mã lớp học
 *     responses:
 *       200:
 *         description: Trả về thông tin lớp học
 *   put:
 *     summary: Cập nhật thông tin lớp học
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: identifier
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa lớp học
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa lớp học thành công
 */

/**
 * @swagger
 * /classes/{classIdentifier}/student:
 *   post:
 *     summary: Học sinh tham gia lớp học
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: classIdentifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã lớp học
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tham gia lớp học thành công
 */

/**
 * @swagger
 * /classes/{classIdentifier}/student/{studentId}:
 *   delete:
 *     summary: Học sinh rời khỏi lớp học
 *     tags: [Lớp học]
 *     parameters:
 *       - in: path
 *         name: classIdentifier
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rời lớp học thành công
 */

router.get('/classes', getClasses);
router.get('/classes/user/:userid', getClassesByUserId);
router.get('/classes/:identifier', getClassByIdentifier);
router.post('/classes', createClass);
router.post('/classes/:classIdentifier/student', joinClass);
router.put('/classes/:identifier', updateClass);
router.delete('/classes/:classIdentifier/student/:studentId', leaveClass);
router.delete('/classes/:identifier', deleteClass);

module.exports = router;