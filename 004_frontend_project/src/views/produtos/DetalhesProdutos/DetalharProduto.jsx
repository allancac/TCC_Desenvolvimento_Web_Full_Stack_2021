import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export const DetalharProduto = ({ produto, setPagina }) => {
  return (
    <>
      <h2>Detalhes do Produto</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nome'>Nome do Produto:</Form.Label>
            <Form.Control
              readOnly
              id='nome'
              value={produto.nome}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='tipo'>Tipo do Produto:</Form.Label>
            <Form.Control
              readOnly
              id='tipo'
              value={produto.tipo}
              onChange={() => {}}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='descricao'>Descriçaõ do Produto:</Form.Label>
            <Form.Control
              readOnly
              id='descricao'
              value={produto.descricao}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='preco'>Preço do Produto:</Form.Label>
            <Form.Control
              readOnly
              id='preco'
              value={produto.preco}
             
            />
          </Form.Group>
        </Row>

        <hr />

        <Row>
          <Col className='text-center'>
            <Button
              className='mx-4'
              variant='warning'
              onClick={() => {
                setPagina((pagina) => 1);
              }}
            >
              Alterar
            </Button>
            <Button
              className='mx-4'
              variant='danger'
              onClick={() => {
                setPagina((pagina) => 2);
              }}
            >
              Excluir
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
