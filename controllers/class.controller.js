const Class = require('../models/class.model.js');
const User = require('../models/user.model.js');

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate('teacherId', 'fullname');
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getClassesByUserId = async (req, res) => {
    try {
        const userID = req.params.userid;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let classes;
        if (user.role === 'teacher') {
            classes = await Class.find({ teacherId: userID });
        } else if (user.role === 'student') {
            classes = await Class.find({ students: userID });
        }

        if (classes.length === 0) {
            return res.status(404).json({ message: 'No classes found for this user' });
        }
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClassByIdentifier = async (req, res) => {
    try {
        const identifier = req.params.identifier;
        let classData = await Class.findOne({ classCode: identifier });

        if (!classData) {
            classData = await Class.findById(identifier);
        }

        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classData);
    } catch (error) {
        console.error('Error fetching class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createClass = async (req, res) => {
    try {
        const { className, classCode, teacherId } = req.body;
        if (!className || !classCode || !teacherId) {
            return res.status(400).json({ message: 'Class name, code, and teacher ID are required' });
        }

        // Kiểm tra xem lớp học đã tồn tại chưa
        const existingClass = await Class.findOne({ classCode: classCode });
        if (existingClass) {
            return res.status(409).json({ message: 'Class with this code already exists' });
        }

        const user = await User.findById(teacherId);
        if (!user) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Kiểm tra xem người dùng có phải là giáo viên không
        if (user.role !== 'teacher') {
            return res.status(403).json({ message: 'User is not a teacher' });
        }

        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const joinClass = async (req, res) => {
    try {
        const classIdentifier = req.params.classIdentifier;
        const { studentId } = req.body;
        let classData = await Class.findOne({ classCode: classIdentifier });
        let student = await User.findById(studentId);

        if (!classData) {
            classData = await Class.findById(classIdentifier);
        }
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }
        if (student.role !== 'student') {
            return res.status(403).json({ message: 'User is not a student' });
        }
        if (classData.students.includes(studentId)) {
            return res.status(400).json({ message: 'Student already in this class' });
        }
        classData.students.push(studentId);
        await classData.save();
        res.status(200).json({ message: 'User added to class successfully', classData });
    } catch (error) {
        console.error('Error joining class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const leaveClass = async (req, res) => {
    try {
        const { classIdentifier, studentId } = req.params;

        let classData = await Class.findOne({ classCode: classIdentifier });

        if (!classData) {
            classData = await Class.findById(classIdentifier);
        }
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        if (!classData.students.includes(studentId)) {
            return res.status(400).json({ message: 'Student not in this class' });
        }
        classData.students = classData.students.filter(student => student.toString() !== studentId);
        await classData.save();
        res.status(200).json({ message: 'Student removed from class successfully', class: classData });
    } catch (error) {
        console.error('Error leaving class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateClass = async (req, res) => {
    try {
        const classID = req.params.classid;
        const updatedClass = await Class.findByIdAndUpdate(classID, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteClass = async (req, res) => {
    try {
        const classIdentifier = req.params.identifier;
        const deletedClass = await Class.findOneAndDelete({ classCode: classIdentifier });

        if (!deletedClass) {
            deleteClass = await Class.findByIdAndDelete(classIdentifier);
        }
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getClasses,
    getClassesByUserId,
    getClassByIdentifier,
    createClass,
    joinClass,
    leaveClass,
    updateClass,
    deleteClass
};