const express = require('express');
const { getNotifications,
    getNotificationsByUserId,
    getNotificationsById,
    createNotification,
    getNotificationsByUserAndClass,
    getNotificationsByClass,
    updateNotification,
    deleteNotification,
    deleteAllNotificationsByUser } = require('../controllers/notification.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Thông báo
 *     description: Quản lý các thông báo
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Lấy tất cả thông báo
 *     tags: [Thông báo]
 *     responses:
 *       200:
 *         description: Danh sách tất cả thông báo
 *   post:
 *     summary: Tạo mới một thông báo
 *     tags: [Thông báo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thông báo thành công
 */

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Lấy thông báo theo ID
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Trả về thông báo theo ID
 *   put:
 *     summary: Cập nhật thông báo theo ID
 *     tags: [Thông báo]
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa thông báo theo ID
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */

/**
 * @swagger
 * /notifications/user/{userId}:
 *   get:
 *     summary: Lấy thông báo theo người dùng
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách thông báo theo người dùng
 *   delete:
 *     summary: Xóa tất cả thông báo của người dùng
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xóa tất cả thông báo của người dùng
 */

/**
 * @swagger
 * /notifications/user/{userId}/class/{classId}:
 *   get:
 *     summary: Lấy thông báo theo người dùng và lớp học
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách thông báo theo người dùng và lớp học
 */

/**
 * @swagger
 * /notifications/class/{classId}:
 *   get:
 *     summary: Lấy thông báo theo lớp học
 *     tags: [Thông báo]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách thông báo theo lớp học
 */

router.get('/notifications', getNotifications);
router.get('/notifications/:id', getNotificationsById);
router.get('/notifications/user/:userId', getNotificationsByUserId);
router.get('/notifications/user/:userId/class/:classId', getNotificationsByUserAndClass);
router.get('/notifications/class/:classId', getNotificationsByClass);
router.post('/notifications', createNotification);
router.put('/notifications/:id', updateNotification);
router.delete('/notifications/:id', deleteNotification);
router.delete('/notifications/user/:userId', deleteAllNotificationsByUser);

module.exports = router;