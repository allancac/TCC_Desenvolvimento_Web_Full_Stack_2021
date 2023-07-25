import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import EstoqueServices from "../../../services/EstoqueServices";
import { CartaoEstoque as Cartao } from "../../../components/Cartoes";
import { setEstoque } from "../../../redux/actions/vendasActions";
import { useDispatch } from "react-redux";

export const Pagina3 = () => {
  const dispatch = useDispatch();
  const [estoques, setEstoques] = useState([]);
  const [estoqueSelecionado, setEstoqueSelecionado] = useState(null);

  async function buscarEstoques() {
    const estoqueServices = new EstoqueServices();
    try {
      const { data } = await estoqueServices.buscarListaEstoques();
      setEstoques(data);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
    }
  }

  // Função enviada para o componente Cartão e que atualiza o produto na Store do Redux
  const selecionarEstoque = (estoque) => {
    setEstoqueSelecionado(estoque);
    dispatch(setEstoque(estoque));
  };

  useEffect(() => {
    buscarEstoques();
  }, []);

  return (
    <fieldset style={{ minHeight: "450px" }}>
      <h2>Estoque de Origem</h2>
      <Container>
        <Row>
          {estoques.map((item) => (
            <Col key={item.id} md={4} sm={6}>
              <Cartao
                estoque={item}
                selecionarEstoque={selecionarEstoque}
                estoqueSelecionado={estoqueSelecionado}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </fieldset>
  );
};
