const User = require('../models/user.model');
const Class = require('../models/class.model');
const Grade = require('../models/grade.model');

const getGrades = async (req, res) => {
    try {
        const grades = await Grade.find({});
        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getGradeById = async (req, res) => {
    try {
        const gradeId = req.params.id;
        const grade = await Grade.findById(gradeId);
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.status(200).json(grade);
    } catch (error) {
        console.error('Error fetching grade by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getStudentGradeInClass = async (req, res) => {
    try {
        const { studentId, identifier } = req.params;
        let classData = await Class.findOne({ classCode: identifier });
        if (!classData) {
            classData = await Class.findById(identifier);
        }
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const grade = await Grade.findOne({
            studentId,
            classId: classData._id
        });
        if (!grade) {
            return res.status(404).json({ message: 'Grade not found for this student in the class' });
        }
        res.status(200).json(grade);
    } catch (error) {
        console.error('Error fetching student grade in class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getStudentGradeInClasses = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const grades = await Grade.find({ studentId });
        if (grades.length === 0) {
            return res.status(404).json({ message: 'No grades found for this student' });
        }
        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching student grades:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClassGrades = async (req, res) => {
    try {
        const identifier = req.params.identifier;
        let classData = await Class.findOne({ classCode: identifier });
        if (!classData) {
            classData = await Class.findById(identifier);
        }
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const grades = await Grade.find({ classId: classData._id });
        if (grades.length === 0) {
            return res.status(404).json({ message: 'No grades found for this class' });
        }
        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching class grades:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createGrade = async (req, res) => {
    try {
        const { studentId, classId, grade } = req.body;

        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const student = classData.students.includes(studentId);
        if (!student) {
            return res.status(400).json({ message: 'Student is not in this class' });
        }

        const existingGrade = await Grade.findOne({ studentId, classId });
        if (existingGrade) {
            return res.status(400).json({ message: 'Grade already exists' });
        }

        const newGrade = new Grade({
            studentId,
            classId,
            grade
        });

        await newGrade.save();
        res.status(200).json(newGrade);
    } catch (error) {
        console.error('Error creating grade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateGrade = async (req, res) => {
    try {
        const gradeId = req.params.id;
        const { grade } = req.body;

        const existingGrade = await Grade.findById(gradeId);
        if (!existingGrade) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        // Cập nhật từng trường nếu có
        if (grade.process !== undefined) {
            existingGrade.grade.process = grade.process;
        }
        if (grade.midterm !== undefined) {
            existingGrade.grade.midterm = grade.midterm;
        }
        if (grade.final !== undefined) {
            existingGrade.grade.final = grade.final;
        }
        await existingGrade.save();
        res.status(200).json(existingGrade);
    } catch (error) {
        console.error('Error updating grade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteGrade = async (req, res) => {
    try {
        const gradeId = req.params.id;
        const deletedGrade = await Grade.findByIdAndDelete(gradeId);
        if (!deletedGrade) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (error) {
        console.error('Error deleting grade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getGrades,
    getGradeById,
    getStudentGradeInClass,
    getStudentGradeInClasses,
    getClassGrades,
    createGrade,
    updateGrade,
    deleteGrade
};