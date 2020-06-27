import gql from 'graphql-tag';

const createUser = gql`
  mutation User($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
      status
    }
  }
`;

export default createUser;
