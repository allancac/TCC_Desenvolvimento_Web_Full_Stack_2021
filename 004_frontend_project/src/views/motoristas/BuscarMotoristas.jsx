import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

export const BuscarMotoristas = () => {
  const [cpf, setCPF] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Container>
        <Row>
          <Col lg={4}>
            <h2>Buscar Motorista</h2>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='CPF do Motorista'
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
                value={cpf}
                onChange={(event) => {
                  event.preventDefault();
                  setCPF((cpf) => event.target.value);
                }}
              />
              <Button variant='primary' cpf='button-addon2'>
                <LinkContainer to={`/motoristas/detalhes/${cpf}`}>
                  <Nav.Link>Buscar pelo CPF</Nav.Link>
                </LinkContainer>
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
