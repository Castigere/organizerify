const getUserFullName = ({ loggedInUser }) => {
  if (
    loggedInUser &&
    (loggedInUser.firstName || loggedInUser.middleName || loggedInUser.lastName)
  ) {
    return `${loggedInUser.firstName || ''} ${loggedInUser.middleName ||
      ''} ${loggedInUser.lastName || ''}`;
  }
  if (loggedInUser && loggedInUser.displayName) {
    return loggedInUser && loggedInUser.displayName;
  }
  return 'mr. Noname Assholeius';
};

const getCurrentUser = ({ loggedInUser }) => loggedInUser && loggedInUser;

const getUserStatus = ({ loggedInUser }) =>
  loggedInUser ? loggedInUser.status : 'user not logged in';

export default { getUserFullName, getCurrentUser, getUserStatus };
