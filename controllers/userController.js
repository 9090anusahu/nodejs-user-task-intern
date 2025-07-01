 const User = require('../models/User');
const xlsx = require('xlsx');

exports.renderAddUser = (req, res) => {
    res.render('users');
};

exports.addUser = async (req, res) => {
    const { name, email, mobile } = req.body;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(email) || !mobileRegex.test(mobile)) {
        return res.send('Invalid Email or Mobile Format');
    }
    await User.query().insert({ name, email, mobile });
    res.redirect('/users/add');
};

exports.exportUsersTasks = async (req, res) => {
    const users = await User.query().withGraphFetched('tasks');
    const userSheet = users.map(u => ({ id: u.id, name: u.name, email: u.email, mobile: u.mobile }));
    const taskSheet = users.flatMap(u => u.tasks.map(t => ({
        userId: u.id,
        taskName: t.name,
        status: t.status
    })));

    const wb = xlsx.utils.book_new();
    const wsUsers = xlsx.utils.json_to_sheet(userSheet);
    const wsTasks = xlsx.utils.json_to_sheet(taskSheet);
    xlsx.utils.book_append_sheet(wb, wsUsers, 'Users');
    xlsx.utils.book_append_sheet(wb, wsTasks, 'Tasks');

    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename=Users_Tasks.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};
