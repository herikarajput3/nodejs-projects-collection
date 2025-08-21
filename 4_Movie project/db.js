const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/MovieDB')
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log(err))

module.exports = mongoose;