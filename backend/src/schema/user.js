import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getCurrentUser: User!
    getUserById(id: ID!): User
    getUsers: [User!]
  }

  extend type Mutation {
    loginUser(email: String!, password: String!): User!
    logoutUser: Boolean!
    createUser(
      firstName: String
      middleName: String
      lastName: String
      email: String!
      mobileNumber: String
      password: String!
      role: String
      status: String!
    ): User!
    updateUser(
      id: ID!
      firstName: String
      middleName: String
      lastName: String
      email: String
      mobileNumber: String
      language: String
      role: String
      status: String!
    ): User!
    deleteUser(id: ID!): Boolean!
    signUpUser(email: String!, password: String!): User!
  }

  type User {
    id: ID!
    displayName: String
    firstName: String
    middleName: String
    lastName: String
    email: String
    mobileNumber: String
    joinDate: Date!
    language: String!
    role: String!
    type: String!
    logonMessage: String
    status: String!
    events: [Event!]
  }
`;
