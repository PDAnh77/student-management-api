const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const Signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const role = req.body.role || 'student';

        //Kiểm tra username đã tồn tại hay chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Kiểm tra vai trò hợp lệ
        const allowedRoles = ['student', 'teacher'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = Signup;