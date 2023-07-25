import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CartaoProduto as Cartao } from "../../../components/Cartoes";
import ProdutosServices from "../../../services/ProdutosServices";
import { setProduto } from "../../../redux/actions/vendasActions";
import { useDispatch } from "react-redux";

export const Pagina2 = () => {
  const dispatch = useDispatch();
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  async function buscarProdutos() {
    const produtosServices = new ProdutosServices();
    try {
      const resultado = await produtosServices.buscarListaProdutos();
      setProdutos(resultado.data);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
    }
  }

  // Função enviada para o componente Cartão e que atualiza o produto na Store do Redux
  const selecionarProduto = (produto) => {
    setProdutoSelecionado(produto);
    dispatch(setProduto(produto));
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <fieldset style={{ minHeight: "450px" }}>
      <h2>Produto Vendido </h2>
      <Container>
        <Row>
          {produtos.map((produto) => (
            <Col key={produto.id} md={4} sm={6}>
              <Cartao
                produto={produto}
                selecionarProduto={selecionarProduto}
                produtoSelecionado={produtoSelecionado}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </fieldset>
  );
};
