const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: String   
}, { timestamps: true });

module.exports = model('Movie', movieSchema);
