const { UserMongoSchema } = require('./userMongoSchema');
const { VenueMongoSchema } = require('./venueMongoSchema');
const { EventMongoSchema } = require('./eventMongoSchema');
const { CommentMongoSchema } = require('./commentMongoSchema');
const { SessionMongoSchema } = require('./sessionMongoSchema');

module.exports = {
  UserMongoSchema,
  VenueMongoSchema,
  EventMongoSchema,
  CommentMongoSchema,
  SessionMongoSchema
};
