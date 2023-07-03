import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';

export const ListaEnderecosCliente = ({ setEnderecos, enderecos }) => {
  return (
    <>
      <ListGroup className='border'>
        {enderecos.map((endereco, ind) => (
          <ListGroup.Item key={ind} className='position-relative'>
            <Container>
              <Row>
                <Col md={10}>
                  <span>
                    <b>{ind + 1}</b> - {endereco.logradouro} - {endereco.tipo}
                  </span>
                </Col>
                <Col md={2}>
                  <Button
                    size='sm'
                    variant='danger'
                    className='position-absolute top-50  translate-middle'
                    onClick={(event) => {
                      event.preventDefault();
                      setEnderecos(endereco)
                    }}
                  >
                    Remover
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
