const router = require('express').Router();
require('../config/db'); // Ensure DB is connected

router.use('/auth', require('./authRoutes'));
router.use('/posts', require('./postRoutes'));
router.use('/admin', require('./adminRoutes'));

module.exports = router;