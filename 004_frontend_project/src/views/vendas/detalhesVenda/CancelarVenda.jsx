import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import VendasServices from "../../../services/VendasServices";
import { useState } from "react";
import AlertDismissible from "../../../components/Alerts/Alerts";

export const CancelarVenda = ({ venda, setPagina }) => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: "",
    heading: "",
    textArray: [],
  });
  const cancelarVenda = async (id) => {
    const vendasServices = new VendasServices();
    try {
      const {
        status: { message },
      } = await vendasServices.cancelarVenda(id);
      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = message;
        return {
          variant: "success",
          heading: "Venda Excluído",
          textArray: [`O venda foi excluída com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: "danger",
          heading: "Erro ao excluir a venda",
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
            <h1>Cancelar a Venda {venda.id}?</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Table responsive="sm" hover striped bordered size="sm">
            <thead>
              <tr>
                <th colSpan={2} className=" text-light bg-secondary ">
                  Informações da Venda
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID da Venda</th>
                <td>{venda.id}</td>
              </tr>
              <tr>
                <th>Quantidade</th>
                <td>
                  {venda.quantidade} m<sup>3</sup>
                </td>
              </tr>
              <tr>
                <th>Valor Total</th>
                <td>R$ {venda.preco_total}</td>
              </tr>
              <tr>
                <th>Data da Venda</th>
                <td>{`${new Date(venda.createdAt).toLocaleString()}`}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Table responsive="sm" hover striped bordered size="sm">
            <thead>
              <tr>
                <th colSpan={2} className=" text-light bg-secondary ">
                  Informações do Cliente
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID do Cliente</th>
                <td>{venda.cliente.id}</td>
              </tr>
              <tr>
                <th>Nome do Cliente</th>
                <td>{venda.cliente.nome}</td>
              </tr>
              <tr>
                <th>CNPJ do Cliente</th>
                <td>{venda.cliente.cnpj}</td>
              </tr>
              <tr>
                <th>E-mail do Cliente</th>
                <td>{venda.cliente.email}</td>
              </tr>
              <tr>
                <th>Telefone de contato</th>
                <td>{venda.cliente.telefone}</td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <hr />
        <Row>
          <Col className="text-center">
            <Button
              className="mx-4"
              variant="warning"
              onClick={(event) => {
                event.preventDefault();
                setPagina((pagina) => pagina - 1);
              }}
            >
              Voltar
            </Button>

            <Button
              className="mx-4"
              variant="danger"
              onClick={(event) => {
                event.preventDefault();
                cancelarVenda(venda.id);
              }}
            >
              Cancelar a venda !
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
