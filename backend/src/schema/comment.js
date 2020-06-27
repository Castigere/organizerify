import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getComments(limit: Int, cursor: String): CommentConnection!
    getCommentById(id: ID!): Comment
    getCommentsByResource(id: ID!, limit: Int, cursor: String): CommentConnection!
  }

  extend type Mutation {
    createComment(userId: ID!, resourceId: ID!, header: String!, body: String!): Comment!
    updateComment(id: ID!, header: String!, body: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  extend type Subscription {
    commentCreated: CommentCreated!
  }

  type CommentCreated {
    comment: Comment!
  }

  type CommentConnection {
    edges: [Comment!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Comment {
    id: ID!
    userId: ID!
    status: String!
    resourceId: String!
    header: String!
    body: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;
