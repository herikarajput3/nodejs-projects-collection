const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const { uploadSingleImage } = require('../middleware/upload');
const ctrl = require('../controllers/postController');

router.get('/', asyncHandler(ctrl.getPosts));              // querystring filters: q, tag, page, limit, sort
router.get('/:id', asyncHandler(ctrl.getPostById));        // route param :id
router.post('/', requireAuth, uploadSingleImage, asyncHandler(ctrl.createPost));
router.put('/:id', requireAuth, uploadSingleImage, asyncHandler(ctrl.updatePost));
router.delete('/:id', requireAuth, asyncHandler(ctrl.deletePost));

module.exports = router;
