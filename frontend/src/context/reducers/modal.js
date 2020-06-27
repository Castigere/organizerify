export const modal = {
  isModalOpen: false
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case 'MODAL_IS_OPEN':
      return {
        ...state,
        isModalOpen: true
      };
    case 'MODAL_IS_CLOSED':
      return {
        ...state,
        isModalOpen: false
      };
    default:
      return state;
  }
};
