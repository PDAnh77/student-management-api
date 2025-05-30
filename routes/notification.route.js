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