const { Schema, model } = require("mongoose");

const commonSchema = {
    type: String,
    trim: true
}
const TaskSchema = new Schema({
    task:
    {
        ...commonSchema,
        required: true
    },
    description:
    {
        ...commonSchema,
        required: false
    },
    status: {
        ...commonSchema,
        enum: ['pending', 'inprogress', 'completed'],
        default: 'pending'
    },
    completed:
    {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = model('Task', TaskSchema);