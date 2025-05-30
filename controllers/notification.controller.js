const Notification = require('../models/notification.model');
const User = require('../models/user.model');
const Class = require('../models/class.model');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNotificationsById = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error('Error fetching notification by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNotificationsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userID = await User.findById(userId);
        let notifications;

        if (!userID) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (userID.role === 'student') {
            notifications = await Notification.find({ studentId: userId });
        } else if (userID.role === 'teacher') {
            notifications = await Notification.find({ teacherId: userId });
        }
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNotificationsByUserAndClass = async (req, res) => {
    try {
        const { userId, classId } = req.params;
        const notifications = await Notification.find({ userId, classId });
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user in this class' });
        }
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications by user and class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getNotificationsByClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        const notifications = await Notification.find({ classId });
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this class' });
        }
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications by class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createNotification = async (req, res) => {
    try {
        const { studentId, classId, type } = req.body;
        if (!studentId || !classId || !type) {
            return res.status(400).json({ message: 'Student ID, Class ID, and Type are required' });
        }

        const existingNotification = await Notification.findOne({ studentId, classId, type });
        if (existingNotification) {
            return res.status(409).json({ message: 'Notification already exists' });
        }

        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const teacherId = classData.teacherId;

        if (classData.students.includes(studentId) && type !== 'leave') {
            return res.status(400).json({ message: 'Invalid notification type' });
        }
        if (!classData.students.includes(studentId) && type !== 'join') {
            return res.status(400).json({ message: 'Invalid notification type' });
        }
        const newNotification = new Notification({ studentId, classId, type, teacherId });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const { message, type, status } = req.body;
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { message, type, status },
            { new: true }
        );
        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAllNotificationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await Notification.deleteMany({ userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }
        res.status(200).json({ message: 'All notifications deleted successfully' });
    } catch (error) {
        console.error('Error deleting notifications by user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getNotifications,
    getNotificationsById,
    getNotificationsByUserId,
    getNotificationsByUserAndClass,
    getNotificationsByClass,
    createNotification,
    updateNotification,
    deleteNotification,
    deleteAllNotificationsByUser
};