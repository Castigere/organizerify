import gql from 'graphql-tag';

const commentCreated = gql`
  subscription Comment {
    commentCreated {
      comment {
        id
        body
        createdAt
        user {
          id
          displayName
        }
      }
    }
  }
`;

export default commentCreated;
