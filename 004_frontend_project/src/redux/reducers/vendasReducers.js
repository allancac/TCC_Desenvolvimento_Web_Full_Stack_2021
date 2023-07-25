const initialState = {
  cliente: {},
  endereco: {},
  veiculo: {},
  motorista: {},
  produto: {},
  estoque: {},
  id_usuario: null,
  quantidade: null,
  preco_total: null,
};

export const vendaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CLIENTE':
      return { ...state, cliente: action.payload };
    case 'SET_ENDERECO':
      return { ...state, endereco: action.payload };
    case 'SET_VEICULO':
      return { ...state, veiculo: action.payload };
    case 'SET_ID_USUARIO':
      return { ...state, id_usuario: action.payload };
    case 'SET_PRODUTO':
      return { ...state, produto: action.payload };
    case 'SET_ESTOQUE':
      return { ...state, estoque: action.payload };
    case 'SET_MOTORISTA':
      return { ...state, motorista: action.payload };
    case 'SET_QUANTIDADE':
      return { ...state, quantidade: action.payload };
    case 'SET_PRECO_TOTAL':
      return { ...state, preco_total: action.payload };
    case 'RESET_VENDA':
      return initialState;
    default:
      return state;
  }
};
