const User = require('../models/user.model');
const UserStudent = require('../models/student.model');
const UserTeacher = require('../models/teacher.model');
const bcrypt = require('bcrypt');

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ message: 'Username and password are required' });
        }
        
        // Lấy user và đảm bảo trường password được lấy về
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // So sánh password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        res.status(200).json({
          message: 'Login successful',
          user: {
              id: user._id,
              username: user.username,
              role: user.role
          }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

module.exports = Login;