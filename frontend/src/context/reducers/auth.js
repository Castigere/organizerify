export const auth = {
  isUserAuthenticated: false
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        isUserAuthenticated: true
      };
    case 'LOG_OUT_USER':
      return {
        ...state,
        isUserAuthenticated: false
      };
    default:
      return state;
  }
};
