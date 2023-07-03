const initialState = {
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
};

export const vendaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VENDA':
      return { ...state, ...action.payload }
    default:
      return state;
  }
}
