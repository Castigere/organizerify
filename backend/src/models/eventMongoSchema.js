const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    rsvp: [
      {
        userId: { type: String },
        comment: { type: String },
        status: { type: String },
        joinedAt: { type: Date, default: Date.now }
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'new', 'updated', 'deleted']
    },
    comments: [
      {
        createdAt: { type: Date, default: Date.now },
        userId: { type: String },
        text: { type: String }
      }
    ],
    content: [
      {
        userId: { type: String },
        venueId: { type: String },
        scheduled: { type: Date },
        revisionId: { type: Number },
        tags: { type: [] },
        title: { type: String },
        text: { type: String },
        updatedAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
    strict: true
  }
);

exports.EventMongoSchema = mongoose.model('Event', EventSchema);
