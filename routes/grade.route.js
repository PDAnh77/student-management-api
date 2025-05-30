const express = require('express');
const { getGrades,
    getGradeById,
    getStudentGradeInClass,
    getStudentGradeInClasses,
    getClassGrades,
    createGrade,
    updateGrade,
    deleteGrade } = require('../controllers/grade.controller.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Điểm số
 *     description: Quản lý điểm số của học sinh trong các lớp học
 */

/**
 * @swagger
 * /grades:
 *   get:
 *     summary: Lấy danh sách tất cả điểm
 *     tags: [Điểm số]
 *     responses:
 *       200:
 *         description: Danh sách điểm số
 *   post:
 *     summary: Tạo mới điểm số
 *     tags: [Điểm số]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tạo điểm số thành công
 */

/**
 * @swagger
 * /grades/{id}:
 *   get:
 *     summary: Lấy điểm theo ID
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của điểm
 *     responses:
 *       200:
 *         description: Thông tin điểm số
 *   put:
 *     summary: Cập nhật điểm theo ID
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật điểm thành công
 *   delete:
 *     summary: Xóa điểm theo ID
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa điểm thành công
 */

/**
 * @swagger
 * /grades/class/{identifier}:
 *   get:
 *     summary: Lấy tất cả điểm của một lớp
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: ID hoặc mã lớp học
 *     responses:
 *       200:
 *         description: Danh sách điểm trong lớp
 */

/**
 * @swagger
 * /grades/student/{studentId}:
 *   get:
 *     summary: Lấy tất cả điểm của một học sinh trong các lớp
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách điểm của học sinh
 */

/**
 * @swagger
 * /grades/student/{studentId}/class/{identifier}:
 *   get:
 *     summary: Lấy điểm của một học sinh trong một lớp cụ thể
 *     tags: [Điểm số]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: ID hoặc mã lớp học
 *     responses:
 *       200:
 *         description: Điểm của học sinh trong lớp
 */

router.get('/grades', getGrades);
router.get('/grades/:id', getGradeById);
router.get('/grades/class/:identifier', getClassGrades);
router.get('/grades/student/:studentId', getStudentGradeInClasses);
router.get('/grades/student/:studentId/class/:identifier', getStudentGradeInClass);
router.post('/grades', createGrade);
router.put('/grades/:id', updateGrade);
router.delete('/grades/:id', deleteGrade);

module.exports = router;