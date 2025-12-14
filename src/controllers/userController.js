// src/controllers/userController.js
const User = require('../models/userModel');
const response = require('../utils/response');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });
        
        if (!user) return response.error(res, 404, 'User not found');
        
        return response.success(res, 200, 'User profile fetched', user);
    } catch (err) {
        return response.error(res, 500, 'Server Error', err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Lakukan update
        const [updated] = await User.update({ name, email }, { where: { id: req.userId } });

        if (!updated) {
            return response.error(res, 400, 'No changes made or user not found');
        }
        
        // Ambil data terbaru untuk dikembalikan (Optional, tapi bagus UX-nya)
        const updatedUser = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });

        return response.success(res, 200, 'User updated successfully', updatedUser);
    } catch (err) {
        return response.error(res, 500, 'Update failed', err.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.userId } });
        return response.success(res, 200, 'User deleted successfully');
    } catch (err) {
        return response.error(res, 500, 'Delete failed', err.message);
    }
};