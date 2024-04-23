const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', authService.register);
router.post('/login', authService.login);
router.get('/user', verifyToken, authService.getUser);
router.patch('/user', verifyToken, authService.updateUserInfo);
router.patch('/user/security', verifyToken, authService.updateUserPassword);

module.exports = router;
