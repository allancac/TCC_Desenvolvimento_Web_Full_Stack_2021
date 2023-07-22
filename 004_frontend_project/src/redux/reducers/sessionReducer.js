const initialState = {
  user: null,
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        user: action.payload, 
      };
    default:
      return state;
  }
};