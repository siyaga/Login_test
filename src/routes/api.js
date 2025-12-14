const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const careerController = require('../controllers/careerController');
const { verifyToken } = require('../middlewares/authMiddleware');

// --- Auth Routes ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// --- User CRUD Routes (Protected) ---
router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile/update', verifyToken, userController.updateUser);
router.delete('/profile/delete', verifyToken, userController.deleteUser);

// --- External API Proxy (Protected + Search) ---
router.get('/career/search/name', verifyToken, careerController.searchByName);
router.get('/career/search/nim', verifyToken, careerController.searchByNim);
router.get('/career/search/ymd', verifyToken, careerController.searchByYmd);

module.exports = router;