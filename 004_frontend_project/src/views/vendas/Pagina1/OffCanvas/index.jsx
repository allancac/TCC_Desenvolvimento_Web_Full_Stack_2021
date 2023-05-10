import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { CartaoCliente as Cartao } from '../../../../components/Cartoes';
import ClientesServices from '../../../../services/ClientesServices';

export const OffCanvasClientes = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  const [clientes, setClientes] = useState([]);

  async function buscarClientes() {
    const clientesServices = new ClientesServices();
    try {
      const resultado = await clientesServices.buscarListaClientes();
      setClientes(resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose} placement={'end'}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Selecionar o Cliente</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container>
          <Row>
            {clientes.map((cliente) => (
              <Col key={cliente.id} md={12} sm={6}>
                <Cartao cliente={cliente} />
              </Col>
            ))}
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
