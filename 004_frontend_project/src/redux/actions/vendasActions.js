// Action para atualizar o atributo id_cliente
export const setCliente = (cliente) => {
  return {
    type: 'SET_CLIENTE',
    payload: cliente,
  };
};

// Action para atualizar o atributo id_endereco
export const setEndereco = (endereco) => {
  return {
    type: 'SET_ENDERECO',
    payload: endereco,
  };
};

// Action para atualizar o atributo placa
export const setVeiculo = (veiculo) => {
  return {
    type: 'SET_VEICULO',
    payload: veiculo,
  };
};

// Action para atualizar o atributo cpf_motorista
export const setMotorista = (motorista) => {
  return {
    type: 'SET_MOTORISTA',
    payload: motorista,
  };
};

// Action para atualizar o atributo id_produto
export const setProduto = (produto) => {
  return {
    type: 'SET_PRODUTO',
    payload: produto,
  };
};

// Action para atualizar o atributo id_estoque
export const setEstoque = (estoque) => {
  return {
    type: 'SET_ESTOQUE',
    payload: estoque,
  };
};
// Action para atualizar o atributo id_usuario
export const setIdUsuario = (idUsuario) => {
  return {
    type: 'SET_ID_USUARIO',
    payload: idUsuario,
  };
};

export const resetVenda = () => {
  return {
    type: 'RESET_VENDA',
  };
};

// Action para atualizar o atributo quantidade
export const setQuantidade = (quantidade) => {
  return {
    type: 'SET_QUANTIDADE',
    payload: quantidade,
  };
};

// Action para atualizar o atributo preco_total
export const setPrecoTotal = (precoTotal) => {
  return {
    type: 'SET_PRECO_TOTAL',
    payload: precoTotal,
  };
};
