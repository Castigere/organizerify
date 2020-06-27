import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_parent, _args, { isAuth }) =>
  isAuth ? skip : new ForbiddenError('Not authenticated.');

export const isAdmin = (_parent, _args, { currentUser }) =>
  currentUser.role === 'administrator' ? skip : new ForbiddenError('Not authorized');

export const isCurrentUserOrAdmin = async (_parent, { id }, { models, currentUser }) => {
  const user = await models.UserMongoSchema.findById(id);
  if (currentUser.role === 'administrator' || (user && user._id.toString() === currentUser._id)) {
    return skip;
  }
  throw new ForbiddenError('Not authorized');
};
