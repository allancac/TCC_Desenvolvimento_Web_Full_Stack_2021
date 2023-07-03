import { Card, Button, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const CartaoProduto = ({ produto: { tipo, nome, descricao, preco } }) => {
  return (
    <Card style={{ width: '11em' }} type='button'>
      <Card.Img src={`https://dummyimage.com/250x250/aaa/fff.jpg&text=${nome}`} />
      <Card.Body>
        <Card.Title>Tipo: {tipo}</Card.Title>
        <Card.Text>{descricao}<br /><strong>Preço - R${preco}/m<sup>3</sup></strong> </Card.Text>
      </Card.Body>
    </Card>
  )
}

export const CartaoEstoque = ({ estoque: { produto, volume, localizacao, tipo } }) => {
  return (
    <Card style={{ width: '11em' }} type='button'>
      <Card.Img src={`https://dummyimage.com/250x250/aaa/fff.jpg&text=${tipo + ' ' + produto.properties.nome.example}`} />
      <Card.Body>
        <Card.Title>Tipo: {tipo}</Card.Title>
        <Card.Text>Produto: {produto.properties.nome.example}.
          Capacidade Total: {volume} m<sup>3</sup>.
          Localização: {localizacao}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export const CartaoCliente = ({ cliente: { id, nome, telefone, cnpj, endereco } }) => {
  return (
    <Card style={{ width: '18rem' }} type='button'>
      <Card.Body>
        <Card.Title>{nome}</Card.Title>
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