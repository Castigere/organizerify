const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String },
    status: {
      type: String,
      enum: ['draft', 'new', 'updated', 'deleted']
    },
    resourceId: { type: String },
    header: { type: String },
    body: { type: String }
  },
  {
    timestamps: true,
    strict: true
  }
);

exports.CommentMongoSchema = mongoose.model('Comment', CommentSchema);
