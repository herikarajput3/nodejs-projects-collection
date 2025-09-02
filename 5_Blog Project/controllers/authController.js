const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Session = require('../models/Session');

const COOKIE_NAME = 'sid';

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already used' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: role === 'admin' ? 'admin' : 'user' });
  return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const sid = uuidv4();
  const ttl = 1000 * 60 * 60 * 24 * 7; // 7 days
  const expiresAt = new Date(Date.now() + ttl);
  await Session.create({ sid, user: user._id, expiresAt });

  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(COOKIE_NAME, sid, {
    httpOnly: true,
    signed: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: ttl
  });
  return res.json({ message: 'Signed in', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.signout = async (req, res) => {
  const sid = req.signedCookies?.sid;
  if (sid) {
    await Session.deleteOne({ sid });
    res.clearCookie(COOKIE_NAME);
  }
  return res.json({ message: 'Signed out' });
};

exports.whoami = async (req, res) => {
  if (!req.user) return res.status(200).json({ user: null });
  return res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
};
