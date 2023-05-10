
import { configureStore } from '@reduxjs/toolkit';

import { vendaReducer } from './reducers/vendasReducers';

const store = configureStore({
  reducer: { vendaReducer }

})
export default store;