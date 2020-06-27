import gql from 'graphql-tag';

const getUserById = gql`
  query User($id: ID!) {
    getUserById(id: $id) {
      displayName
    }
  }
`;

export default getUserById;
