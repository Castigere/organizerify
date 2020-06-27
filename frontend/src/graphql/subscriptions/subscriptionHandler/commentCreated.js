import { message } from '../../../containers/Messaging';

const commentCreatedHandler = data => {
  message(data.commentCreated.comment.body, 'info');
};

export default commentCreatedHandler;
