const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ['student', 'teacher'],
            default: 'student',
            required: false
        },
    },
    {
        Timestamp: true
    }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;