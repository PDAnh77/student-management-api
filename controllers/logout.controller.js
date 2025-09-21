require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const Logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET_RESET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        User.findById(user.id).then(dbUser => {
            if (!dbUser || dbUser.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            dbUser.refreshToken = null;
            dbUser.save();
            res.status(200).json({ message: 'Logged out successfully' });
        }).catch(error => {
            console.error('Error during logout:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
    });
}

module.exports = Logout;