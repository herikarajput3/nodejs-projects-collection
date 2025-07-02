const express = require('express');
const { TaskController } = require('../Controller/TaskController');
const router = express.Router();

require('../db');

router.post('/createTask', TaskController);

module.exports = router;