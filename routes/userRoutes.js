 const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/add', userController.renderAddUser);
router.post('/add', userController.addUser);
router.get('/export', userController.exportUsersTasks);

module.exports = router;
