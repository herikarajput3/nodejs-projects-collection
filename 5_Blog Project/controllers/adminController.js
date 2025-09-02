const User = require('../models/User');
const Post = require('../models/Post');

exports.dashboard = async (req, res) => {
  const [users, posts] = await Promise.all([User.countDocuments(), Post.countDocuments()]);
  return res.json({ users, posts, admin: req.user?.email });
};
