const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog_backend')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;