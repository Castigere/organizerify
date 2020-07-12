import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    getUserAccountType: async (_parent, { email }, { models }) => {
      const document = await models.UserMongoSchema.findOne({ email });
      if (document) {
        return {
          email,
          type: document.type,
          exists: true,
          available: false
        };
      }
      return { email, exists: false };
    },
    getEmailAvailability: combineResolvers(
      isAuthenticated,
      (_parent, { email }, { models, currentUser }) =>
        models.UserMongoSchema.findOne({ email })
          .then(document => {
            if (document && document._id.equals(currentUser._id)) {
              return {
                email,
                exists: true,
                available: true
              };
            }
            if (document && !document._id.equals(currentUser._id)) {
              return {
                email,
                exists: true,
                available: false
              };
            }
            return {
              email,
              exists: false,
              available: true
            };
          })
          .catch(err => {
            return err;
          })
    )
  },
  Mutation: {
    setNewAccountPassword: combineResolvers(
      isAuthenticated,
      async (_parent, { id, currentPassword, newPassword }, { models }) => {
        const document = await models.UserMongoSchema.findById(id);
      }
    )
  }
};
