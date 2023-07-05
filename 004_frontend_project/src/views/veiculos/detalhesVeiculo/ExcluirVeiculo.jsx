import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import VeiculosServices from '../../../services/VeiculosServices';
import { useState } from 'react';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const ExcluirVeiculo = ({ veiculo, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const excluirVeiculo = async (placa) => {
    const veiculosServices = new VeiculosServices();
    try {
      const {
        status: { message },
      } = await veiculosServices.deletarVeiculo(placa);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: 'success',
          heading: 'Veiculo Excluído',
          textArray: [`O veículo foi excluído com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao excluir veículo',
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
            <h1>Excluir o Veículo "{veiculo.placa}"?</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Table responsive='sm' striped bordered size='sm'>
              <tbody>
                <tr>
                  <th>Placa</th>
                  <th>{veiculo.placa}</th>
                </tr>
                <tr>
                  <th>Marca</th>
                  <td>{veiculo.marca}</td>
                </tr>
                <tr>
                  <th>Modelo </th>
                  <td>{veiculo.modelo}</td>
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
                excluirVeiculo(veiculo.placa);
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
