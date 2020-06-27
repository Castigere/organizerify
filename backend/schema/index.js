import { gql } from 'apollo-server-express';
import userSchema from './user';
import eventSchema from './event';
import commentSchema from './comment';
import accountSchema from './account';
import sessionSchema from './session';
// import venueSchema from './venue';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, eventSchema, commentSchema, accountSchema, sessionSchema];
