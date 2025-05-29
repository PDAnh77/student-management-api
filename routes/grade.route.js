const express = require('express');
const { getStudentGradeInClass, getStudentGrades, getClassGrades, createGrade, updateGrade, deleteGrade } = require('../controllers/grade.controller.js');
const router = express.Router();

router.get('/grades/student/:studentId/class/:identifier', getStudentGradeInClass);
router.get('/grades/student/:studentId', getStudentGrades);
router.get('/grades/class/:identifier', getClassGrades);
router.post('/grades', createGrade);
router.put('/grades/:gradeId', updateGrade);
router.delete('/grades/:gradeId', deleteGrade);

module.exports = router;