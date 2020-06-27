import gql from 'graphql-tag';

const getSessionStatus = gql`
  query Session {
    getSessionStatus {
      isSessionActive
    }
  }
`;

export default getSessionStatus;
