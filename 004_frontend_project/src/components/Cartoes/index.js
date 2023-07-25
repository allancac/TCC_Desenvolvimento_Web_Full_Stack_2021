import { Card, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//TODO Refatorar e criar um compoente para os botões
export const CartaoProduto = ({ produto, selecionarProduto, label, produtoSelecionado }) => {
  const { id, nome, descricao, preco } = produto;
  const isSelecionado = produtoSelecionado && produtoSelecionado.id === id;
  return (
    <Card style={{ width: '16em' }}>
      <Card.Body>
        <Card.Title><strong>{nome}</strong></Card.Title>
        <hr />
        <Card.Text>
          ID do Produto: <strong>{id}</strong> <br />
          {descricao}<br />
          <strong>Preço - R${preco}/m<sup>3</sup></strong><br />
        </Card.Text>
        {selecionarProduto ? (
          isSelecionado ? (
            <Button variant="success" disabled>
              Selecionado
            </Button>
          ) : (
            <Button variant="primary" onClick={() => selecionarProduto(produto)}>
              {label || 'Selecionar'}
            </Button>
          )
        ) : (
          <Button variant="primary">
            <LinkContainer to={`/produtos/detalhes/${id}`}>
              <Nav.Link>Ver Detalhes</Nav.Link>
            </LinkContainer>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export const CartaoEstoque = ({ estoque, selecionarEstoque, estoqueSelecionado }) => {
  const { id, capacidade_maxima, localizacao, volume, id_produto } = estoque;
  const isSelecionado = estoqueSelecionado && estoqueSelecionado.id === id;

  return (
    <Card style={{ width: '16em' }}>
      <Card.Body>
        <Card.Title>Estoque: <strong>{id}</strong> <br /> {((volume / capacidade_maxima) * 100).toFixed(1)}%</Card.Title>
        <hr />
        <Card.Text>
          Produto: {id_produto}<br />
          Localização: {localizacao}<br />
          Volume Atual: {volume} m<sup>3</sup>.<br />
          Capacidade Máxima: {capacidade_maxima} m<sup>3</sup>.<br />
        </Card.Text>
        {selecionarEstoque ? (
          isSelecionado ? (
            <Button variant="success" disabled>
              Selecionado
            </Button>
          ) : (
            <Button variant="primary" onClick={() => selecionarEstoque(estoque)}>
              Selecionar
            </Button>
          )
        ) : (
          <Button variant="primary">
            <LinkContainer to={`/estoques/detalhes/${id}`}>
              <Nav.Link>Ver Detalhes</Nav.Link>
            </LinkContainer>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export const CartaoCliente = ({ cliente, selecionarCliente, label, clienteSelecionado }) => {
  const isSelecionado = clienteSelecionado && clienteSelecionado.id === cliente.id;
  return (
    <Card style={{ width: '16rem' }} type='button'>
      <Card.Body>
        <Card.Title><strong>{cliente.nome}</strong></Card.Title>
        <hr />
        <Card.Text>
          ID Cliente: {cliente.id} <br />
          Telefone: {cliente.telefone}.<br />
          CNPJ: {cliente.cnpj}.<br />
        </Card.Text>
        {selecionarCliente ? (
          isSelecionado ? (
            <Button variant="success" disabled>
              Selecionado
            </Button>
          ) : (
            <Button variant="primary" onClick={() => selecionarCliente(cliente)}>
              {label || 'Selecionar'}
            </Button>
          )
        ) : (
          <Button variant="primary">
            <LinkContainer to={`/clientes/detalhes/${cliente.id}`}>
              <Nav.Link>Ver Detalhes</Nav.Link>
            </LinkContainer>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export const CartaoVeiculo = ({ veiculo: { placa, id_cliente, marca, modelo, altura_cacamba, largura_cacamba, comprimento_cacamba } }) => {
  return (
    <Card style={{ width: '16rem' }} type='button'>
      <Card.Body>
        <Card.Title><strong>{placa}</strong></Card.Title>
        <p>{id_cliente && (`ID do Cliente: ${id_cliente}`)}</p>
        <hr />
        <Card.Text>
          Volume:<strong> {(altura_cacamba * largura_cacamba * comprimento_cacamba).toFixed(2)}</strong><br />
          Marca: {marca} <br />
          Modelo: {modelo} <br />
        </Card.Text>
        <Button variant="primary">
          <LinkContainer to={`/veiculos/detalhes/${placa}`}>
            <Nav.Link>Ver Detalhes</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
    </Card>
  )
}

export const CartaoMotorista = ({ motorista: { cpf, nome, telefone, placa } }) => {
  return (
    <Card style={{ width: '16rem' }} type='button'>
      <Card.Body>
        <Card.Title><strong>{nome}</strong></Card.Title>
        <hr />
        <Card.Text>
          Veículo: {placa}<br />
          CPF: {cpf} <br />
          Nome: {nome}.<br />
          Telefone: {telefone}.<br />
        </Card.Text>
        <Button variant="primary">
          <LinkContainer to={`/motoristas/detalhes/${cpf}`}>
            <Nav.Link>Ver Detalhes</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
    </Card>
  )
}