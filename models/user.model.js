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
        fullname: {
            type: String,
            required: false,
            default: null
        },
        birthday: {
            type: Date,
            required: false,
            default: null
        },
        email: {
            type: String,
            required: false,
            default: null
        },
        academicYear: {
            type: Number,
            required: false,
            default: null
        },
        refreshToken: {
            type: String,
            required: false,
            default: null
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;