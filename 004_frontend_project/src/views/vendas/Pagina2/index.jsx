import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartaoProduto as Cartao } from '../../../components/Cartoes';
import ProdutosServices from '../../../services/ProdutosServices';

export const Pagina2 = () => {
  const [produtos, setProdutos] = useState([]);

  async function buscarProdutos() {
    const produtosServices = new ProdutosServices();
    try {
      const resultado = await produtosServices.buscarListaProdutos();
      setProdutos(resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <fieldset style={{ minHeight: '450px' }}>
      <h2>Produto Vendido </h2>
      <Container>
        <Row>
          {produtos.map((produto) => (
            <Col key={produto.id} md={3} sm={6}>
              <Cartao produto={produto} />
            </Col>
          ))}
        </Row>
      </Container>
    </fieldset>
  );
};
