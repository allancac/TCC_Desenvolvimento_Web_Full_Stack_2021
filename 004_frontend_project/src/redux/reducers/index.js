import { combineReducers } from 'redux';
import { vendaReducer } from './vendasReducers';
import { menuLateralReducer } from './menuLateralReducers';

export default combineReducers({
  venda: vendaReducer,
  menuLateral: menuLateralReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
