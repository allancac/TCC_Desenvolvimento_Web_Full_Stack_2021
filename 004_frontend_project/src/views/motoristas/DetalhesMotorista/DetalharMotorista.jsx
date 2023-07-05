import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export const DetalharMotorista = ({ motorista, setPagina }) => {
  return (
    <>
      <h2>Detalhes do Motorista</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='cpfMotorista'>CPF do Motorista:</Form.Label>
            <Form.Control
              id='cpfMotorista'
              value={motorista.cpf}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='placa'>Placa do Veículo:</Form.Label>
            <Form.Control
              id='placa'
              value={motorista.placa}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nomeMotorista'>Nome do Motorista:</Form.Label>
            <Form.Control
              id='nomeMotorista'
              value={motorista.nome}
              onChange={() => {}}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='telefoneMotorista'>
              Telefone do Motorista:
            </Form.Label>
            <Form.Control
              id='telefoneMotorista'
              value={motorista.telefone}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='email'>E-mail do Motorista:</Form.Label>
            <Form.Control
              id='email'
              value={motorista.email}
              onChange={() => {}}
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
