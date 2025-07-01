 const express = require('express');
const { engine } = require('express-handlebars');
require('dotenv').config();
require('./db');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
