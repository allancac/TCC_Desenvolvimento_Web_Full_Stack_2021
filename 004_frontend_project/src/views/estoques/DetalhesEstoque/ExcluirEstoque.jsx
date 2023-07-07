import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import EstoquesServices from '../../../services/EstoqueServices';
import { useState } from 'react';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const ExcluirEstoque = ({ estoque, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const excluirEstoque = async (id) => {
    const estoquesServices = new EstoquesServices();
    try {
      const {
        status: { message },
      } = await estoquesServices.deletarEstoque(id);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: 'success',
          heading: 'Estoque Excluído',
          textArray: [`O estoque foi excluído com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao excluir estoque',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Excluir o Estoque "{estoque.id}"?</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Table responsive='sm' striped bordered size='sm'>
            <tbody>
              <tr>
                <th>ID do Estoque</th>
                <th>{estoque.id}</th>
              </tr>
              <tr>
                <th>ID do Produto Aramazenado</th>
                <td>{estoque.id_produto}</td>
              </tr>
              <tr>
                <th>Localização</th>
                <td>{estoque.localizacao}</td>
              </tr>
              <tr>
                <th>Tipo do Estoque </th>
                <td>{estoque.tipo_estoque}</td>
              </tr>
              <tr>
                <th>Volume Atual</th>
                <td>{estoque.volume}</td>
              </tr>
              <tr>
                <th>Capacidade Máxima</th>
                <td>{estoque.capacidade_maxima}</td>
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
              excluirEstoque(estoque.id);
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
  );
};
