import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isAdmin, isCurrentUserOrAdmin } from './authorization';

export default {
  Query: {
    getCurrentUser: combineResolvers(
      isAuthenticated,
      (_parent, _args, { currentUser }) => currentUser
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
      async (_parent, { password, email, ...args }, { models }) => {
        try {
          const document = await models.UserMongoSchema.findOne({ email });
          if (document) return new Error('User already exists');
          const newUser = new models.UserMongoSchema({
            ...args,
            email,
            displayName: args.firstName,
            status: 'incomplete',
            language: 'en',
            type: 'local'
          });
          newUser.password = newUser.generateHash(password);
          await newUser.save();
          return newUser;
        } catch (err) {
          return new Error(err);
        }
      }
    ),

    updateUser: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      (_parent, { id, ...args }, { models, mongoUpdateOptions }) =>
        models.UserMongoSchema.findByIdAndUpdate(id, args, mongoUpdateOptions)
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
        req.session.destroy(function(err) {
          // cannot access session here
        });
        return true;
      } catch (err) {
        return err;
      }
    },

    signUpUser: async (_parent, { password, email }, { models, req }) => {
      try {
        const document = await models.UserMongoSchema.findOne({ email });
        if (document) return new Error('User already exists');
        const newUser = new models.UserMongoSchema({
          email,
          firstName: 'New',
          lastName: 'User',
          status: 'incomplete',
          language: 'en',
          type: 'local',
          role: 'member'
        });
        newUser.password = newUser.generateHash(password);
        await newUser.save();
        await req.login(newUser, err => err);
        return newUser;
      } catch (err) {
        return new Error(err);
      }
    }
  }
};
