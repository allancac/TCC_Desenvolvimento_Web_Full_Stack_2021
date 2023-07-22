export const setSession = (user) => {
  return {
    type: 'SET_SESSION',
    payload: user,
  };
};