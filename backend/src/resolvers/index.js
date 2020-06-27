import { GraphQLDateTime } from 'graphql-iso-date';

import userResolver from './user';
import venueResolver from './venue';
import eventResolver from './event';
import commentResolver from './comment';
import accountResolver from './account';
import sessionResolver from './session';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  customScalarResolver,
  userResolver,
  venueResolver,
  eventResolver,
  commentResolver,
  accountResolver,
  sessionResolver
];
