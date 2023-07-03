
export const menuLateralReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MENULATERAL':
      return [...action.payload]

    default:
      return state;
  }
};

