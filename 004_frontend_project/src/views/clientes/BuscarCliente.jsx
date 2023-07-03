import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

export const BuscarCliente = () => {
  const [id, setId] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Container>
        <Row>
          <Col lg={4}>
            <h2>Buscar Cliente</h2>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='ID do Cliente'
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
                value={id}
                onChange={(event) => {
                  event.preventDefault();
                  setId((id) => event.target.value);
                }}
              />
              <Button variant='primary' id='button-addon2'>
                <LinkContainer to={`/clientes/detalhes/${id}`}>
                  <Nav.Link>Buscar pelo ID</Nav.Link>
                </LinkContainer>
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
