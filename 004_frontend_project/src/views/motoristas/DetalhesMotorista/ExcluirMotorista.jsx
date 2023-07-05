import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import MotoristasServices from '../../../services/MotoristasServices';
import { useState } from 'react';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const ExcluirMotorista = ({ motorista, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const excluirMotorista = async (cpf) => {
    const motoristasServices = new MotoristasServices();
    try {
      const {
        status: { message },
      } = await motoristasServices.deletarMotorista(cpf);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: 'success',
          heading: 'Motorista Excluído',
          textArray: [`O motorista foi excluído com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao excluir motorista',
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
            <h1>Excluir o Motorista "{motorista.nome}"?</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Table responsive='sm' striped bordered size='sm'>
              <tbody>
                <tr>
                  <th>CPF do Motorista</th>
                  <th>{motorista.cpf}</th>
                </tr>
                <tr>
                  <th>Placa do Veículo</th>
                  <th>{motorista.placa}</th>
                </tr>
                <tr>
                  <th>Nome do Motorista</th>
                  <td>{motorista.nome}</td>
                </tr>

                <tr>
                  <th>E-mail</th>
                  <td>{motorista.email}</td>
                </tr>
                <tr>
                  <th>Telefone</th>
                  <td>{motorista.telefone}</td>
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
                excluirMotorista(motorista.cpf);
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
