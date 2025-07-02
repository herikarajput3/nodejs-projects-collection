const TaskSchema = require("../Model/TaskSchema");

exports.TaskController = async (req, res) => {
    try {
        const { task, description, status, completed } = req.body;

        const taskData = {
            task,
        };

        if (description !== undefined) {
            taskData.description = description;
        }

        if (status && ['pending', 'inprogress', 'completed'].includes(status)) {
            taskData.status = status;
        }

        if (typeof completed === 'boolean') {
            taskData.completed = completed;
        }

        const newTask = await TaskSchema.create(taskData)

        if (newTask) {
            res.status(201).json({
                message: "Task created successfully",
                data: newTask
            })
        } else {
            res.status(400).json({
                message: "Task not created"
            })
        }
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}