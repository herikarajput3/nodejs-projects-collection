const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const { requireAdmin } = require('../middleware/auth');
const { dashboard } = require('../controllers/adminController');

router.get('/dashboard', requireAdmin, asyncHandler(dashboard));

module.exports = router;
