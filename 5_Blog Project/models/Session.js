const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    sid: { type: String, required: true, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true, index: { expires: '1d' } }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
