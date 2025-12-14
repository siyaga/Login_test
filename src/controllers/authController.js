// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const response = require('../utils/response'); // Import Helper tadi

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return response.error(res, 400, 'All fields are required');
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ name, email, password: hashedPassword });
        
        // Response Sukses Menggunakan Helper
        return response.success(res, 201, 'User registered successfully', {
            userId: user.id,
            email: user.email
        });

    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
             return response.error(res, 409, 'Email already exists');
        }
        return response.error(res, 500, 'Internal server error', err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return response.error(res, 400, 'Email and password are required');
        }

        const user = await User.findOne({ where: { email } });
        
        let isValidLogin = false;
        if (user) {
            isValidLogin = await bcrypt.compare(password, user.password);
        }

        // Security: Pesan error ambigu untuk anti-pentesting
        if (!isValidLogin) {
            return response.error(res, 401, 'Invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

        // Response Sukses Login (Sesuai request access_token)
        return response.success(res, 200, 'Login successful', {
            access_token: token,
            token_type: 'Bearer',
            expires_in: 86400,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        return response.error(res, 500, 'Internal server error', err.message);
    }
};