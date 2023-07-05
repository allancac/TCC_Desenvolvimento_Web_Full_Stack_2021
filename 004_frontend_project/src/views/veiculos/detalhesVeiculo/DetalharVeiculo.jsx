import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export const DetalharVeiculo = ({ veiculo, setPagina }) => {
  return (
    <>
      <h2>Detalhes do Veículo</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='idCliente'>Placa:</Form.Label>
            <Form.Control id='idCliente' value={veiculo.placa} readOnly />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='marca'>Marca:</Form.Label>
            <Form.Control id='marca' value={veiculo.marca} readOnly />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='modelo'>Modelo:</Form.Label>
            <Form.Control id='modelo' value={veiculo.modelo} readOnly />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='altura'>Altura da Caçamba(m):</Form.Label>
            <Form.Control id='altura' value={veiculo.altura_cacamba} readOnly />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='largura'>Largura da Caçamba(m):</Form.Label>
            <Form.Control
              id='largura'
              value={veiculo.largura_cacamba}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='comprimento'>
              Comprimento da Caçamba(m):
            </Form.Label>
            <Form.Control
              id='comprimento'
              value={veiculo.comprimento_cacamba}
              readOnly
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} className='mb-4 '>
            <Form.Label htmlFor='capacidade'>
              Capacidade de Carga &#40;m<sup>3</sup> &#41; :
            </Form.Label>
            <Form.Control
              className='text-center'
              style={{ color: 'green', fontWeight: 'bolder' }}
              id='capacidade'
              type='text'
              readOnly
              disabled
              value={
                Math.max(
                  0,

                  veiculo.largura_cacamba *
                    veiculo.altura_cacamba *
                    veiculo.comprimento_cacamba
                ).toFixed(2) + ' m³'
              }
            />
          </Form.Group>
        </Row>
        <hr />
        {veiculo.clientes && (
          <>
            <h2>Proprietário:</h2>
            <Row>
              <Table responsive='sm' hover striped bordered size='sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Cliente</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>CNPJ</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{veiculo.clientes.id}</td>
                  <td>{veiculo.clientes.nome}</td>
                  <td>{veiculo.clientes.telefone}</td>
                  <td>{veiculo.clientes.email}</td>
                  <td>{veiculo.clientes.cnpj}</td>
                </tbody>
              </Table>
            </Row>
            <hr />
          </>
        )}
        {veiculo.motoristas.length > 0 && (
          <>
            <h2>Motoristas:</h2>
            <Row>
              <Table responsive='sm' hover striped bordered size='sm'>
                <thead>
                  <tr>
                    <th>CPF</th>
                    <th>Nome do Motorista</th>
                    <th>Telefone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculo.motoristas.map((motorista, ind) => {
                    return (
                      <tr>
                        <td>{motorista.cpf}</td>
                        <td>{motorista.nome}</td>
                        <td>{motorista.telefone}</td>
                        <td>{motorista.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
            <hr />
          </>
        )}
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
