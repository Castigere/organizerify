const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    _id: { type: String },
    session: { type: String },
    expires: { type: Date }
  },
  {
    strict: true
  }
);

exports.SessionMongoSchema = mongoose.model('Session', SessionSchema);
