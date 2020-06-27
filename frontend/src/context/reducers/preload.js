export const preload = {
  appIsReady: false
};

export const preloadReducer = (state, action) => {
  switch (action.type) {
    case 'APP_IS_READY':
      return {
        ...state,
        appIsReady: true
      };
    default:
      return state;
  }
};
