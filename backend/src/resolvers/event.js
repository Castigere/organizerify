export default {
  Query: {
    event: (_parent, { id }, { models }) => models.EventMongoSchema.findById(id),
    events: (_parent, _args, { models }) => models.EventMongoSchema.find()
  },

  Event: {
    id: event => event._id
  },

  Rsvp: {
    id: rsvp => rsvp._id,
    user: (rsvp, _args, { models }) => models.UserMongoSchema.findById(rsvp.userId)
  }
};
