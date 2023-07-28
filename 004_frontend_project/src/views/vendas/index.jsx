import React, { useState, useEffect } from "react";
import { menuVendas } from "../../components/Aside/listaMenuLateral";
import setMenuLateral from "../../redux/actions/menuLateralActions";
import { useDispatch } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Container } from "react-bootstrap";
import VendasServices from "../../services/VendasServices";
import { Paginacao } from "../../components/Paginacao/Paginacao";
import BasicSpinner from "../../components/Spinners/basicSpinner";

export const Vendas = () => {
  const dispatch = useDispatch();
  const [vendas, setVendas] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const buscarVendas = async () => {
    const vendasServices = new VendasServices();
    try {
      const resultado = await vendasServices.buscarListaVendas(offset, limit);
      setVendas(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
    }
  };

  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  useEffect(() => {
    buscarVendas();
    dispatch(setMenuLateral(menuVendas));
  }, [offset]);

  return (
    <>
      <h1>Listagem de vendas</h1>
      <hr />
      {vendas.length === 0 ? (
        <Row className="text-center align-middle">
          <Col style={{ height: "300px" }}>
            <h2>Aguarde...</h2>
            <br />
            <BasicSpinner />
          </Col>
        </Row>
      ) : (
        <Container>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Venda</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Total</th>
                <th>Data da Venda</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>{venda.id}</td>
                  <td>{venda.cliente.nome}</td>
                  <td>{venda.produto.nome}</td>
                  <td>
                    {venda.quantidade} m<sup>3</sup>
                  </td>
                  <td>R${venda.preco_total}</td>
                  <td>{new Date(venda.createdAt).toLocaleDateString()}</td>
                  <td>
                    <LinkContainer to={`/vendas/detalhes/${venda.id}`}>
                      <Nav.Link className="text-primary ">
                        <u>Ver detalhes</u>
                      </Nav.Link>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col></Col>
            <Col>
              <Paginacao
                total={total}
                limit={limit}
                offset={offset}
                alteraPagina={alteraPagina}
              />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};
