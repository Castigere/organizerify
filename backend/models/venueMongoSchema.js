const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema(
  {
    userId: { type: String },
    status: {
      type: String,
      enum: ['draft', 'new', 'updated', 'deleted']
    },
    content: [
      {
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

exports.VenueMongoSchema = mongoose.model('Venue', VenueSchema);
