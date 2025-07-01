 const Task = require('../models/Task');
const User = require('../models/User');

exports.renderAddTask = async (req, res) => {
    const users = await User.query();
    res.render('tasks', { users });
};

exports.addTask = async (req, res) => {
    const { user_id, name, status } = req.body;
    await Task.query().insert({ user_id, name, status });
    res.redirect('/tasks/add');
};

exports.getTasksByUserId = async (req, res) => {
    const userId = req.params.id;
    const tasks = await Task.query().where('user_id', userId);
    res.json(tasks);
};
