export const messages = {
  messages: [],
  errors: []
};

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.data]
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: [...state.errors].pop()
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.data]
      };
    case 'REMOVE_MESSAGE':
      return {
        ...state
      };
    default:
      return state;
  }
};
