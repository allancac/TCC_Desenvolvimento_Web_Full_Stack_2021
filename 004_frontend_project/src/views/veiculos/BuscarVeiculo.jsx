import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
export const BuscarVeiculo = () => {
  const [placa, setPlaca] = useState('');
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
                placeholder='Placa'
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
                value={placa}
                onChange={(event) => {
                  event.preventDefault();
                  setPlaca((placa) => event.target.value);
                }}
              />
              <Button variant='primary' id='button-addon2'>
                <LinkContainer to={`/veiculos/detalhes/${placa}`}>
                  <Nav.Link>Buscar Veículo</Nav.Link>
                </LinkContainer>
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
