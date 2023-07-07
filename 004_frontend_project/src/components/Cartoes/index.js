import { Card, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const CartaoProduto = ({ produto: { id, nome, tipo, descricao, preco } }) => {
  return (
    <Card style={{ width: '16em' }} type='button'>
      <Card.Body>
        <Card.Title><strong>{nome}</strong></Card.Title>
        <hr />
        <Card.Text>
          ID do Produto: <strong> {id} </strong> <br />
          {descricao}<br />
          <strong>Preço - R${preco}/m<sup>3</sup></strong><br />
        </Card.Text>
        <Button variant="primary">
          <LinkContainer to={`/produtos/detalhes/${id}`}>
            <Nav.Link>Ver Detalhes</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
    </Card>
  )
}

export const CartaoEstoque = ({ estoque: { id, capacidade_maxima, localizacao, volume, id_produto } }) => {
  return (
    <Card style={{ width: '18em' }} type='button'>
      <Card.Body>
        <Card.Title>Estoque: <strong> {id} </strong> <br /> {((volume / capacidade_maxima) * 100).toFixed(1)}% </Card.Title>
        <hr />
        <Card.Text>
          Produto:{id_produto}<br />
          Localização: {localizacao}<br />
          Volume Atual : {volume} m<sup>3</sup>.<br />
          Capacidade Máxima : {capacidade_maxima} m<sup>3</sup>.<br />
        </Card.Text>
        <Button variant="primary">
          <LinkContainer to={`/estoques/detalhes/${id}`}>
            <Nav.Link>Ver Detalhes</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
    </Card>
  )
}

export const CartaoCliente = ({ cliente: { id, nome, telefone, cnpj } }) => {
  return (
    <Card style={{ width: '16rem' }} type='button'>
      <Card.Body>
        <Card.Title><strong>{nome}</strong></Card.Title>
        <hr />
        <Card.Text>
          ID Cliente: {id} <br />
          Telefone: {telefone}.<br />
          CNPJ: {cnpj}.<br />
        </Card.Text>
        <Button variant="primary">
          <LinkContainer to={`/clientes/detalhes/${id}`}>
            <Nav.Link>Ver Detalhes</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
    </Card>
  )
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