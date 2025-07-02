const TaskSchema = require("../Model/TaskSchema");

exports.CreateTask = async (req, res) => {
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

exports.GetAllTask = async (req, res) => {
    try {
        const tasks = await TaskSchema.find();
        if (tasks) {
            res.status(200).json({
                message: "Tasks fetched successfully",
                data: tasks
            })
        } else {
            res.status(404).json({
                message: "Tasks not found"
            })
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskSchema.findByIdAndUpdate(id);
        if (task) {
            res.status(200).json({
                message: "Task updated successfully",
                data: task
            })
        } else {
            res.status(404).json({
                message: "Task not found"
            })
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskSchema.findByIdAndDelete(id);
        if (task) {
            res.status(200).json({
                message: "Task deleted successfully",
                data: task
            })
        } else {
            res.status(404).json({
                message: "Task not found"
            })
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}