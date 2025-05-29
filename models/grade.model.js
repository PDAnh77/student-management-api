const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true
        },
        grade: {
            process: {
                type: Number,
                min: 0,
                max: 10,
                required: false,
                default: null
            },
            midterm: {
                type: Number,
                min: 0,
                max: 10,
                required: false,
                default: null
            },
            final: {
                type: Number,
                min: 0,
                max: 10,
                required: false,
                default: null
            },
        },
    },
    {
        timestamps: true
    }
);

const Grade = mongoose.model('Grade', GradeSchema);
module.exports = Grade;