const express = require('express');
const { getClasses,
    getClassesByUserId,
    getClassByIdentifier,
    createClass,
    joinClass,
    leaveClass,
    updateClass,
    deleteClass } = require('../controllers/class.controller.js');
const router = express.Router();

router.get('/classes', getClasses);
router.get('/classes/user/:userid', getClassesByUserId);
router.get('/classes/:identifier', getClassByIdentifier);
router.post('/classes', createClass);
router.post('/classes/:classIdentifier/student', joinClass);
router.put('/classes/:identifier', updateClass);
router.delete('/classes/:classIdentifier/student/:studentId', leaveClass);
router.delete('/classes/:identifier', deleteClass);

module.exports = router;