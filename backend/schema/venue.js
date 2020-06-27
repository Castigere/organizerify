import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getVenueById(id: ID!): Venue!
    getVenues: [Venue]!
  }

  type Venue {
    
  }
`;
