import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { CartaoCliente as Cartao } from "../../../../components/Cartoes";
import ClientesServices from "../../../../services/ClientesServices";
import { setCliente } from "../../../../redux/actions/vendasActions";
import { useDispatch } from "react-redux";

export const OffCanvasClientes = ({ show, setShow, buscaCliente }) => {
  const dispatch = useDispatch();
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  // Variável de estado com a lista de Clientes encontrados
  const [clientes, setClientes] = useState([]);

  // Manipula a exibição do componente Offcanvas e limpa a lista de clientes
  const handleClose = () => {
    setClientes([]);
    setShow(false);
  };

  // TODO Tratamento de erro para cliente não encontrado
  const [errors, setErrors] = useState([]);

  // Busca lista de clientes de acordo com o valor (id ou nome) passado na Página 1
  const buscarClientes = async () => {
    const clientesServices = new ClientesServices();
    try {
      if (isNaN(parseInt(buscaCliente))) {
        const { data } = await clientesServices.buscarClienteNome(buscaCliente);
        if (data) setClientes(data[0]);
      } else {
        const { data } = await clientesServices.buscarCliente(buscaCliente);
        if (data) setClientes([data[0]]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Função enviada para o componente Cartão e que atualiza o Cliente na Store do Redux
  const selecionarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    dispatch(setCliente(cliente));
  };

  useEffect(() => {
    if (show) buscarClientes();
  }, [show]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Selecionar o Cliente</Offcanvas.Title>
      </Offcanvas.Header>
      <hr />
      {clientes.length > 0 && (
        <Offcanvas.Body>
          <Container>
            <Row>
              {clientes.map((cliente) => (
                <Col key={cliente.id} md={12} sm={6}>
                  <Cartao
                    cliente={cliente}
                    selecionarCliente={selecionarCliente}
                    clienteSelecionado={clienteSelecionado}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Offcanvas.Body>
      )}
      {clientes.length === 0 && (
        <Offcanvas.Body>Buscando clientes...</Offcanvas.Body>
      )}

      {(clientes.length === 0) & errors.status && (
        <Offcanvas.Body>Nenhum cliente encontrado</Offcanvas.Body>
      )}
    </Offcanvas>
  );
};
