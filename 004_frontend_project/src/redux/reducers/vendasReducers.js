import {
  SET_ID,
  SET_DATA_VENDA,
  SET_ID_PRODUTO,
  SET_ID_ESTOQUE,
  SET_ID_CLIENTE,
  SET_ID_ENDERECO,
  SET_ID_MOTORISTA,
  SET_ID_VEICULO,
  SET_QUANTIDADE,
  SET_PRECO_TOTAL,
  SET_NOME_CLIENTE,
  SET_ENDERECO,
  SET_MOTORISTA,
} from '../actions/vendasActions';

const initialState = {
  venda: {
    id: 0,
    data_venda: '',
    id_produto: 0,
    id_estoque: 0,
    id_cliente: 0,
    id_endereco: 0,
    id_motorista: 0,
    id_veiculo: '',
    quantidade: 0,
    preco_total: 0,
    nome_cliente: '',
    endereco: '',
    motorista: '',
  },
};

export const vendaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        venda: { ...state.venda, id: action.payload },
      };
    case SET_DATA_VENDA:
      return {
        venda: { ...state.venda, data_venda: action.payload },
      };
    case SET_ID_PRODUTO:
      return {
        venda: { ...state.venda, id_produto: action.payload },
      };
    case SET_ID_ESTOQUE:
      return {
        venda: { ...state.venda, id_estoque: action.payload },
      };
    case SET_ID_CLIENTE:
      return {
        venda: { ...state.venda, id_cliente: action.payload },
      };
    case SET_ID_ENDERECO:
      return {
        venda: { ...state.venda, id_endereco: action.payload },
      };
    case SET_ID_MOTORISTA:
      return {
        venda: { ...state.venda, id_motorista: action.payload },
      };
    case SET_ID_VEICULO:
      return {
        venda: { ...state.venda, id_veiculo: action.payload },
      };
    case SET_QUANTIDADE:
      return {
        venda: { ...state.venda, quantidade: action.payload },
      };
    case SET_PRECO_TOTAL:
      return {
        venda: { ...state.venda, preco_total: action.payload },
      };
    case SET_NOME_CLIENTE:
      return {
        venda: { ...state.venda, nome_cliente: action.payload },
      };
    case SET_ENDERECO:
      return {
        venda: { ...state.venda, endereco: action.payload },
      };
    case SET_MOTORISTA:
      return {
        venda: { ...state.venda, motorista: action.payload },
      };
    default:
      return state;
  }
}
