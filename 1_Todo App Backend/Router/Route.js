const express = require('express');
const { CreateTask, GetAllTask, UpdateTask, DeleteTask } = require('../Controller/TaskController');
const router = express.Router();

require('../db');

router.post('/createTask', CreateTask);
router.get('/allTasks', GetAllTask);
router.put('/updateTask/:id', UpdateTask);
router.delete('/deleteTask/:id', DeleteTask);

module.exports = router;