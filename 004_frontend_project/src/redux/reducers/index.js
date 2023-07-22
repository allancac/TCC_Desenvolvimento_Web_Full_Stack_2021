import { combineReducers } from 'redux';
import { vendaReducer } from './vendasReducers';
import { menuLateralReducer } from './menuLateralReducers';
import { sessionReducer } from './sessionReducer';


export default combineReducers({
  venda: vendaReducer,
  menuLateral: menuLateralReducer,
  session: sessionReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
