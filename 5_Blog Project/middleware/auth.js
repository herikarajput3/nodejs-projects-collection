const cookieParser = require('cookie-parser'); // require in server.js
const Session = require('../models/Session');
const User = require('../models/User');

async function attachUser(req, res, next) {
  try {
    const sid = req.signedCookies?.sid;
    if (!sid) return next();
    const session = await Session.findOne({ sid }).populate('user').lean();
    if (session && session.expiresAt > new Date()) {
      req.user = session.user;
    }
    return next();
  } catch (e) {
    return next(e);
  }
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
}

module.exports = { attachUser, requireAuth, requireAdmin };
