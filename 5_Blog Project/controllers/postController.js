const Post = require('../models/Post');
const { safeUnlink } = require('../Utils/file');

exports.createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Missing fields' });
  const imagePath = req.file ? `public/images/${req.file.filename}` : undefined;
  const post = await Post.create({
    title,
    content,
    tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags.length ? tags.split(',').map(t => t.trim()) : []),
    imagePath,
    author: req.user._id
  });
  return res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const { q, tag, page = 1, limit = 10, sort = '-createdAt' } = req.query;
  const filter = {};
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }];
  if (tag) filter.tags = tag;
  const skip = (Math.max(parseInt(page) || 1, 1) - 1) * (Math.max(parseInt(limit) || 10, 1));
  const perPage = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const [items, total] = await Promise.all([
    Post.find(filter).sort(sort).skip(skip).limit(perPage).populate('author', 'name email role'),
    Post.countDocuments(filter)
  ]);
  return res.json({ items, total, page: Number(page) || 1, limit: perPage });
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', 'name email role');
  if (!post) return res.status(404).json({ error: 'Not found' });
  return res.json(post);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });

  if (title) post.title = title;
  if (content) post.content = content;
  if (typeof tags !== 'undefined') {
    post.tags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []);
  }
  if (req.file) {
    if (post.imagePath) safeUnlink(post.imagePath);
    post.imagePath = `public/images/${req.file.filename}`;
  }
  await post.save();
  return res.json(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });

  if (post.imagePath) safeUnlink(post.imagePath);
  await post.deleteOne();
  return res.json({ message: 'Deleted' });
};
