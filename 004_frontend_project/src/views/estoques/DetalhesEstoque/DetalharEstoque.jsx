import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export const DetalharEstoque = ({ estoque, setPagina }) => {
  return (

      <Container>
      <h2>ID do Estoque</h2>
        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='nome'>ID do Estoque:</Form.Label>
            <Form.Control readOnly disabled id='nome' value={estoque.id} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='id_produto'>ID do Produto:</Form.Label>
            <Form.Control disabled id='id_produto' value={estoque.id_produto} />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='local'>Localização:</Form.Label>
            <Form.Control disabled id='local' value={estoque.localizacao} />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='tipo_estoque'>Tipo de Estoque:</Form.Label>
            <Form.Control
              disabled
              id='tipo_estoque'
              value={estoque.tipo_estoque}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='volume'>
              Volume Atual &#40;m<sup>3</sup> &#41;:
            </Form.Label>
            <Form.Control
              disabled
              id='volume'
              placeholder='Volume Atual'
              value={estoque.volume || ''}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='volume'>
              Capacidade Máxima &#40;m<sup>3</sup> &#41;:
            </Form.Label>
            <Form.Control
              disabled
              id='volume'
              placeholder='Capacidade Máxima'
              value={estoque.capacidade_maxima || ''}
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
   
  );
};
