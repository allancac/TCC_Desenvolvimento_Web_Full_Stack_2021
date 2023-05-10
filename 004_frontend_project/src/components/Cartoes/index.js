import { Card } from 'react-bootstrap';
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
    <Card style={{ width: '11em' }} type='button'>
      {/* <Card.Img src={`https://dummyimage.com/250x250/aaa/fff.jpg&text=${tipo + ' ' + produto.properties.nome.example}`} /> */}
      <Card.Body>
        <Card.Title>{nome}</Card.Title>
        <Card.Text>
          ID do Cliente: {id}
          Telefone: {telefone}.
          CNPJ: {cnpj}.
          Endereço: {endereco}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}