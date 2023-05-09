import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Offcanvas } from 'react-bootstrap';

export const Pagina1 = () => {
  // Hook e funções para controle de exibição do Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <fieldset style={{ minHeight: '450px' }}>
      <h2>Dados do Cliente e do Veículo</h2>
      <Form.Group className='mb-3 '>
        <Container>
          <Row>
            <Form.Label htmlFor='nomeCliente'>Procurar Cliente</Form.Label>
            <Col md={8} sm={12}>
              <Form.Control
                id='nomeCliente'
                placeholder='Nome ou ID do cliente'
              />
            </Col>
            <Col md={4} sm={12}>
              <Button onClick={handleShow} variant='secondary'>
                Buscar Cliente
              </Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Container>
          <Row>
            <Form.Label htmlFor='enderecoEntrega'>
              Endereço de Entrega
            </Form.Label>
            <Col md={8} sm={12}>
              <Form.Select id='enderecoEntrega'>
                <option>Escolha o Endereço</option>
                <option value='120'>Avenida das Américas, 13023</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Container>
          <Row>
            <Form.Label htmlFor='placaVeiculo'>Escolha o Veículo</Form.Label>
            <Col md={8} sm={12}>
              <Form.Select id='placaVeiculo'>
                <option>Escolha o Veículo</option>
                <option value='MMV4455'>MMV4455</option>
                <option value='MMV8877'>MMV8877</option>
                <option value='KML1122'>KML1122</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Form.Group>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Selecionar o Cliente</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li>
              Cliente A<Button className='mx-4'>Selecionar</Button>
            </li>
            <li>
              Cliente B<Button className='mx-4'>Selecionar</Button>
            </li>
            <li>
              Cliente C<Button className='mx-4'>Selecionar</Button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </fieldset>
  );
};
