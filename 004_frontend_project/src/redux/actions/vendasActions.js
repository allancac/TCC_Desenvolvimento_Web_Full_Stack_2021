export const SET_ID = 'SET_ID';
export const SET_DATA_VENDA = 'SET_DATA_VENDA';
export const SET_ID_PRODUTO = 'SET_ID_PRODUTO';
export const SET_ID_ESTOQUE = 'SET_ID_ESTOQUE';
export const SET_ID_CLIENTE = 'SET_ID_CLIENTE';
export const SET_ID_ENDERECO = 'SET_ID_ENDERECO';
export const SET_ID_MOTORISTA = 'SET_ID_MOTORISTA';
export const SET_ID_VEICULO = 'SET_ID_VEICULO';
export const SET_QUANTIDADE = 'SET_QUANTIDADE';
export const SET_PRECO_TOTAL = 'SET_PRECO_TOTAL';
export const SET_NOME_CLIENTE = 'SET_NOME_CLIENTE';
export const SET_ENDERECO = 'SET_ENDERECO';
export const SET_MOTORISTA = 'SET_MOTORISTA';

export const setId = (id) => {
  return {
    type: SET_ID,
    payload: id,
  };
}

export const setDataVenda = (data_venda) => {
  return {
    type: SET_DATA_VENDA,
    payload: data_venda,
  };
}

export const setIdProduto = (id_produto) => {
  return {
    type: SET_ID_PRODUTO,
    payload: id_produto,
  };
}

export const setIdEstoque = (id_estoque) => {
  return {
    type: SET_ID_ESTOQUE,
    payload: id_estoque,
  };
}

export const setIdCliente = (id_cliente) => {
  return {
    type: SET_ID_CLIENTE,
    payload: id_cliente,
  };
}

export const setIdEndereco = (id_endereco) => {
  return {
    type: SET_ID_ENDERECO,
    payload: id_endereco,
  };
}

export const setIdMotorista = (id_motorista) => {
  return {
    type: SET_ID_MOTORISTA,
    payload: id_motorista,
  };
}

export const setIdVeiculo = (id_veiculo) => {
  return {
    type: SET_ID_VEICULO,
    payload: id_veiculo,
  };
}

export const setQuantidade = (quantidade) => {
  return {
    type: SET_QUANTIDADE,
    payload: quantidade,
  };
}

export const setPrecoTotal = (preco_total) => {
  return {
    type: SET_PRECO_TOTAL,
    payload: preco_total,
  };
}

export const setNomeCliente = (nome_cliente) => {
  return {
    type: SET_NOME_CLIENTE,
    payload: nome_cliente,
  };
}

export const setEndereco = (endereco) => {
  return {
    type: SET_ENDERECO,
    payload: endereco,
  };
}

export const setMotorista = (motorista) => {
  return {
    type: SET_MOTORISTA,
    payload: motorista,
  };
}