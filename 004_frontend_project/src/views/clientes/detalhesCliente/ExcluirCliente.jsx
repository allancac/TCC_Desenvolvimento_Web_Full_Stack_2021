import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ClientesServices from '../../../services/ClientesServices';
import { useState } from 'react';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const ExcluirCliente = ({ cliente, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const excluirCliente = async (id) => {
    const clientesServices = new ClientesServices();
    try {
      const {
        status: { message },
      } = await clientesServices.deletarCliente(id);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: 'success',
          heading: 'Cliente Excluído',
          textArray: [`O cliente foi excluído com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao excluir cliente',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };
  return (
    <Form>
      <Container>
        <Row>
          <Col>
            <h1>Excluir o Cliente "{cliente.nome}"?</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Table responsive='sm' striped bordered size='sm'>
              <tbody>
                <tr>
                  <th>ID do Cliente</th>
                  <th>{cliente.id}</th>
                </tr>
                <tr>
                  <th>Nome do Cliente</th>
                  <td>{cliente.nome}</td>
                </tr>
                <tr>
                  <th>CNPJ </th>
                  <td>{cliente.cnpj}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>{cliente.email}</td>
                </tr>
                <tr>
                  <th>Telefone</th>
                  <td>{cliente.telefone}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className='text-center'>
            <Button
              className='mx-4'
              variant='warning'
              onClick={(event) => {
                event.preventDefault();
                setPagina((pagina) => pagina - 2);
              }}
            >
              Cancelar
            </Button>

            <Button
              className='mx-4'
              variant='danger'
              onClick={(event) => {
                event.preventDefault();
                excluirCliente(cliente.id);
              }}
            >
              Excluir !
            </Button>
          </Col>
        </Row>
        <AlertDismissible
          show={showAlert}
          setShow={setShowAlert}
          content={msgAlert}
        />
      </Container>
    </Form>
  );
};
