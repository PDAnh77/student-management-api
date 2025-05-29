const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        fullname: {
            type: String,
            required: false,
            default: null
        },
        brithdate: {
            type: Date,
            required: false,
            default: null
        },
        email: {
            type: String,
            required: false,
            unique: true,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const UserTeacher = mongoose.model('Teacher', TeacherSchema);
module.exports = UserTeacher;