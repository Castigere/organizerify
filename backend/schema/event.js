import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    event(id: ID!): Event!
    events: [Event!]
  }

  type Rsvp {
    id: ID!
    userId: ID!
    user: User
  }

  type Event {
    id: ID!
    status: String
    rsvp: [Rsvp]
  }
`;
