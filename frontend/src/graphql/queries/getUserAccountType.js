import gql from 'graphql-tag';

const getUserAccountType = gql`
  query User($email: String!) {
    getUserAccountType(email: $email) {
      type
      exists
      email
    }
  }
`;

export default getUserAccountType;
