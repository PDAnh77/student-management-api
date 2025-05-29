const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema(
    {
        className: {
            type: String,
            required: true,
            unique: false
        },
        classCode: {
            type: String,
            required: true,
            unique: true
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            required: false,
            default: null
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;