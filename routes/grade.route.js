const express = require('express');
const { getGrades,
    getGradeById,
    getStudentGradeInClass,
    getStudentGradeInClasses,
    getClassGrades,
    createGrade,
    updateGrade,
    deleteGrade } = require('../controllers/grade.controller.js');
const router = express.Router();

router.get('/grades', getGrades);
router.get('/grades/:id', getGradeById);
router.get('/grades/class/:identifier', getClassGrades);
router.get('/grades/student/:studentId', getStudentGradeInClasses);
router.get('/grades/student/:studentId/class/:identifier', getStudentGradeInClass);
router.post('/grades', createGrade);
router.put('/grades/:id', updateGrade);
router.delete('/grades/:id', deleteGrade);

module.exports = router;