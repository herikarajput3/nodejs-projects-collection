const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/TodoApp')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;