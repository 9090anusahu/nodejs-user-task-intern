 const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/add', taskController.renderAddTask);
router.post('/add', taskController.addTask);
router.get('/user/:id', taskController.getTasksByUserId);

module.exports = router;
