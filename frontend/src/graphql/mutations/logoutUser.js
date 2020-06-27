import gql from 'graphql-tag';

const logoutUser = gql`
  mutation User {
    logoutUser
  }
`;

export default logoutUser;
