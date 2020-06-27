import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserAccountType(email: String!): Account!
  }

  type Account {
    email: String!
    exists: Boolean!
    type: String
  }
`;
