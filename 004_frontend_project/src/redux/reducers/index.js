import { combineReducers } from 'redux';
import { vendaReducer } from './vendasReducers';
import { menuLateralReducer } from './menuLateralReducers';
import { userReducer } from './userReducer';

export default combineReducers({
  venda: vendaReducer,
  menuLateral: menuLateralReducer,
  user: userReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
