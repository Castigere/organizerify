import { combineResolvers } from 'graphql-resolvers';
import pubsub, { EVENTS } from '../subscription';
import { queryCollectionWithPagination } from './helpers';
import { isAuthenticated, isCurrentUserOrAdmin } from './authorization';

export default {
  Query: {
    getComments: combineResolvers(isAuthenticated, (_parent, args, context) =>
      queryCollectionWithPagination(args, context, 'CommentMongoSchema')
    ),

    getCommentById: combineResolvers(isAuthenticated, (_parent, { id }, { models }) =>
      models.CommentMongoSchema.findById(id)
    ),

    getCommentsByResource: combineResolvers(isAuthenticated, (_parent, args, context) =>
      queryCollectionWithPagination(args, context, 'CommentMongoSchema')
    )
  },

  Comment: {
    id: comment => comment._id,
    user: (comment, _args, { loaders }) => loaders.user.load(comment.userId)
  },

  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      async (_parent, args, { models }) => {
        const comment = await new models.CommentMongoSchema({
          ...args,
          status: 'new'
        }).save();
        pubsub.publish(EVENTS.COMMENT.CREATED, { commentCreated: { comment } });
        return comment;
      }
    ),

    updateComment: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      (_parent, { id, ...args }, { models, mongoUpdateOptions }) =>
        models.CommentMongoSchema.findByIdAndUpdate(
          id,
          {
            ...args,
            status: 'updated'
          },
          mongoUpdateOptions
        )
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCurrentUserOrAdmin,
      async (_parent, { id }, { models }) => {
        const doc = await models.CommentMongoSchema.findByIdAndRemove(id);
        return !!doc;
      }
    )
  },

  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.COMMENT.CREATED)
    }
  }
};
