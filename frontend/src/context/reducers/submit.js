export const submit = {
  isSubmitting: false
};

export const submitReducer = (state, action) => {
  switch (action.type) {
    case 'IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: true
      };
    case 'DONE_SUBMITTING':
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};
