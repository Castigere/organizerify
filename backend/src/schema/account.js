import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserAccountType(email: String!): Account!
    getEmailAvailability(email: String!): Account!
  }

  type Account {
    email: String!
    exists: Boolean!
    available: Boolean!
    type: String
  }
`;
