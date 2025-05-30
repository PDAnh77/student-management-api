const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        message: {
            type: String,
            required: false,
            default: null
        },
        type: {
            type: String,
            enum: ['leave', 'join'],
            required: true
        },
        status: {
            type: Number,
            Min: 0,
            Max: 2,
            required: false,
            default: '0' // 0: pending, 1: accept, 2: reject
        }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;