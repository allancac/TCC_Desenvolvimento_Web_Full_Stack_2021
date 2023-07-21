import { combineReducers } from 'redux';
import { vendaReducer } from './vendasReducers';
import { menuLateralReducer } from './menuLateralReducers';
import { userReducer } from './userReducer';
import { authReducer } from './authReducer';

export default combineReducers({
  venda: vendaReducer,
  menuLateral: menuLateralReducer,
  user: userReducer,
  token: authReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
