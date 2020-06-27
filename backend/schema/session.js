import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getSessionStatus: Session!
  }

  type Session {
    isSessionActive: Boolean!
  }
`;
