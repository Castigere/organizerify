export const user = {
  loggedInUser: null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER':
      return {
        ...state,
        loggedInUser: action.data
      };
    default:
      return state;
  }
};
