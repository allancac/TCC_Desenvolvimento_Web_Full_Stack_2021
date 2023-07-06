import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ProdutosServices from '../../../services/ProdutosServices';
import { useState } from 'react';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const ExcluirProduto = ({ produto, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const excluirProduto = async (id) => {
    const produtosServices = new ProdutosServices();
    try {
      const {
        status: { message },
      } = await produtosServices.deletarProduto(id);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: 'success',
          heading: 'Produto Excluído',
          textArray: [`O produto foi excluído com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao excluir produto',
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
            <h1>Excluir o Produto "{produto.nome}"?</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Table responsive='sm' striped bordered size='sm'>
              <tbody>
                <tr>
                  <th>ID do Produto</th>
                  <th>{produto.id}</th>
                </tr>
                <tr>
                  <th>Nome do Produto</th>
                  <td>{produto.nome}</td>
                </tr>
                <tr>
                  <th>Tipo do Produto </th>
                  <td>{produto.tipo}</td>
                </tr>
                <tr>
                  <th>Descrição</th>
                  <td>{produto.descricao}</td>
                </tr>
                <tr>
                  <th>Preço</th>
                  <td>{produto.preco}</td>
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
                excluirProduto(produto.id);
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
