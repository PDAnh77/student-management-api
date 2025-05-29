const User = require('../models/user.model');
const UserStudent = require('../models/student.model');
const UserTeacher = require('../models/teacher.model');
const bcrypt = require('bcrypt');

const Signup = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        //Kiểm tra username đã tồn tại hay chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        const basedUser = await newUser.save();

        // Tạo profle dựa trên vai trò
    if (role === 'student') {
      await UserStudent.create({ userId: basedUser._id });
    } else if (role === 'teacher') {
      await UserTeacher.create({ userId: basedUser._id });
    }

res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = Signup;