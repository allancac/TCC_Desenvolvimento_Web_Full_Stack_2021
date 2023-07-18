import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export const DetalharCliente = ({ cliente, setPagina }) => {
  return (
    <>
      <h2>Detalhes do Cliente</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='idCliente'>ID do Cliente:</Form.Label>
            <Form.Control
              id='idCliente'
              value={cliente.id}
              onChange={() => {}}
            />
          </Form.Group>

          <Form.Group as={Col} md={8} className='mb-4 '>
            <Form.Label htmlFor='nomeCliente'>Nome do Cliente:</Form.Label>
            <Form.Control
              id='nomeCliente'
              value={cliente.nome}
              onChange={() => {}}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='cnpjCliente'>CNPJ:</Form.Label>
            <Form.Control
              id='cnpjCliente'
              value={cliente.cnpj}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='emailCliente'>E-mail:</Form.Label>
            <Form.Control
              id='emailCliente'
              value={cliente.email}
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='telefoneCliente'>Telefone:</Form.Label>
            <Form.Control
              id='telefoneCliente'
              value={cliente.telefone}
              onChange={() => {}}
            />
          </Form.Group>
        </Row>
        <hr />
        <Row>
          <h2>Endereços:</h2>
          <Table responsive='sm' striped bordered size='sm'>
            <thead>
              <tr>
                <th>Logradouro</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>CEP</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {cliente.enderecos.map((endereco, ind) => {
                return (
                  <tr key={ind}>
                    <td>{endereco.logradouro}</td>
                    <td>{endereco.cidade}</td>
                    <td>{endereco.estado}</td>
                    <td>{endereco.cep}</td>
                    <td>{endereco.tipo}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <hr />
        </Row>
        <h2>Veículos:</h2>
        <Row>
          <Table responsive='sm' striped bordered size='sm'>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Largura Caçamba</th>
                <th>Altura Caçamba</th>
                <th>Comprimento Caçamba</th>
                <th>
                  Volume &#40;m<sup>3</sup>&#41;
                </th>
              </tr>
            </thead>
            <tbody>
              {cliente.veiculos.map((veiculo, ind) => {
                return (
                  <tr key={ind}>
                    <td>{veiculo.placa}</td>
                    <td>{veiculo.largura_cacamba}</td>
                    <td>{veiculo.altura_cacamba}</td>
                    <td>{veiculo.comprimento_cacamba}</td>
                    <td>
                      {(
                        veiculo.largura_cacamba *
                        veiculo.largura_cacamba *
                        veiculo.comprimento_cacamba
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <hr />
        </Row>

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
