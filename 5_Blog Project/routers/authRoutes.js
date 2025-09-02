const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const { signup, signin, signout, whoami } = require('../controllers/authController');

router.post('/signup', asyncHandler(signup));
router.post('/signin', asyncHandler(signin));
router.post('/signout', asyncHandler(signout));
router.get('/whoami', asyncHandler(whoami));

module.exports = router;
