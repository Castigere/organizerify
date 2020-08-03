import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isAdmin, isCurrentUserOrAdmin } from './authorization';
import { createUserInDb, createUserSession } from './helpers';

export default {
  Query: {
    getCurrentUser: combineResolvers(isAuthenticated, (_parent, _args, { currentUser, models }) =>
      models.UserMongoSchema.findById(currentUser._id)
    ),

    getUserById: combineResolvers(isAuthenticated, (_parent, { id }, { models }) =>
      models.UserMongoSchema.findById(id)
    ),

    getUsers: combineResolvers(isAuthenticated, (_parent, _args, { models }) =>
      models.UserMongoSchema.find()
    )
  },

  User: {
    id: user => user._id,

    events: ({ _id }, _args, { models }) => models.EventMongoSchema.find({ 'rsvp.userId': _id })
  },

  Mutation: {
    createUser: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_parent, args, { models: UserMongoSchema }) => createUserInDb(args, UserMongoSchema)
    ),

    updateUser: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      (_parent, { id, ...args }, { models, mongoUpdateOptions }) => {
        /**
         * Checking length of required fields for an activated user.
         * If one or more strings are empty, user will be set to status incomplete.
         */
        console.log('ARGS', args);
        args.status = 'active';
        [args.firstName, args.middleName, args.lastName, args.email, args.mobileNumber].map(
          item => {
            if (item.length < 1) args.status = 'incomplete';
          }
        );
        return models.UserMongoSchema.findByIdAndUpdate(id, args, mongoUpdateOptions);
      }
    ),

    deleteUser: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      async (_parent, { id }, { models }) => {
        const user = await models.UserMongoSchema.findByIdAndRemove(id);
        return !!user;
      }
    ),

    loginUser: async (_parent, { email, password }, { models, req }) => {
      try {
        const user = await models.UserMongoSchema.findOne({ email });
        if (user) {
          if (user.validPassword(password)) {
            req.login(user, err => err);
            return user;
          }
        }
        return new Error('Incorrect password or username');
      } catch (err) {
        return err;
      }
    },

    logoutUser: async (_parent, _args, { req }) => {
      try {
        await req.logout();
        req.session.destroy(err => err);
        return true;
      } catch (err) {
        return err;
      }
    },

    signUpUser: async (_parent, args, { models: { UserMongoSchema }, req }) => {
      try {
        const newUser = await createUserInDb(args, UserMongoSchema);
        if (newUser) {
          await createUserSession(newUser, req);
          return newUser;
        }
      } catch (err) {
        return err;
      }
    }
  }
};
