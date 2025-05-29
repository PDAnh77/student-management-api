const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
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
        },
        academicYear: {
            type: String,
            required: false,
            default: null
        },
    }
)

const UserStudent = mongoose.model('Student', StudentSchema);
module.exports = UserStudent;