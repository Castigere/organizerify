export const session = {
  isSessionActive: false
};

export const sessionReducer = (state, action) => {
  switch (action.type) {
    case 'SESSION_IS_ACTIVE':
      return {
        ...state,
        isSessionActive: true
      };
    case 'SESSION_IS_INACTIVE':
      return {
        ...state,
        isSessionActive: false
      };
    default:
      return state;
  }
};
