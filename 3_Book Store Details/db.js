const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/book-store')
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log('Failed to connect with database', err))

module.exports = mongoose