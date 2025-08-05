const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
    required: true
}

const bookSchema = Schema({
    name: {
        ...commonSchema
    },
    author: {
        ...commonSchema
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = model('Book', bookSchema);