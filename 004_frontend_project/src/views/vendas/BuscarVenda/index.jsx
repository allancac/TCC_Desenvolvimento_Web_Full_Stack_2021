import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import VendasServices from "../../../services/VendasServices";
import ResultadoBuscaVenda from "./ResultadoBuscaVenda";

export const BuscarVenda = () => {
  const [id_cliente, setCliente] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [id_produto, setProduto] = useState("");
  const [id, setId] = useState("");
  const [resultadoVendas, setResultadoVendas] = useState(null);

  const vendasServices = new VendasServices();

  const handleSearch = async (event) => {
    event.preventDefault();
    setResultadoVendas(null);
    if (id) {
      // Redirecionar para a página de detalhes da venda com o ID fornecido
      window.location.href = `/vendas/detalhes/${id}`;
    } else {
      try {
        // Realizar a busca de vendas pelos filtros id_cliente, período e id_produto
        const resultado = await vendasServices.buscarVendasPorFiltros(
          id_cliente,
          id_produto,
          periodo
        );
        if (resultado && resultado.data) {
          setResultadoVendas(resultado.data);
        } else {
          console.log("Nenhuma venda encontrada");
        }
      } catch (error) {
        // Aqui você pode tratar os erros caso ocorra algum problema na busca
        console.error("Erro ao buscar vendas:", error);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Container>
          <Row>
            <Col lg={4}>
              <h2>Buscar Venda</h2>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="idVenda"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                />
                <Button variant="primary" id="button-addon2">
                  <LinkContainer to={`/vendas/detalhes/${id}`}>
                    <Nav.Link>Buscar Venda</Nav.Link>
                  </LinkContainer>
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>

        <Container>
          <h3>Filtrar Busca</h3>
          <Row>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="idCliente">ID do Cliente:</Form.Label>
                <Form.Control
                  id="idCliente"
                  placeholder="ID do Cliente"
                  aria-describedby="basic-addon2"
                  value={id_cliente}
                  onChange={(event) => setCliente(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="idProduto">ID do Produto:</Form.Label>
                <Form.Control
                  id="idProduto"
                  placeholder="ID do Produto"
                  aria-describedby="basic-addon2"
                  value={id_produto}
                  onChange={(event) => setProduto(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="periodo">À partir da data:</Form.Label>
                <Form.Control
                  id="periodo"
                  placeholder="Período de Vendas"
                  aria-describedby="basic-addon2"
                  type="date"
                  value={periodo}
                  onChange={(event) => setPeriodo(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <hr />
      {resultadoVendas && <ResultadoBuscaVenda vendas={resultadoVendas} />}
    </>
  );
};
