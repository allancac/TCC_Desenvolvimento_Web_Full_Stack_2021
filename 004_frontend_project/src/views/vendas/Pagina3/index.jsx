import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import EstoqueServices from '../../../services/EstoqueServices';
import { CartaoEstoque as Cartao } from '../../../components/Cartoes';

export const Pagina3 = () => {
  const [estoque, setEstoque] = useState([]);

  async function buscarEstoque() {
    const estoqueServices = new EstoqueServices();
    try {
      const resultado = await estoqueServices.buscarListaEstoques();
      setEstoque(resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  }

  useEffect(() => {
    buscarEstoque();
  }, []);

  return (
    <fieldset style={{ minHeight: '450px' }}>
      <h2>Estoque de Origem</h2>
      <Container>
        <Row>
          {estoque.map((item) => (
            <Col key={item.id} md={3} sm={6}>
              <Cartao estoque={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </fieldset>
  );
};
