import gql from 'graphql-tag';

const getEmailAvailability = gql`
  query Account($email: String!) {
    getEmailAvailability(email: $email) {
      email
      available
      exists
    }
  }
`;

export default getEmailAvailability;
