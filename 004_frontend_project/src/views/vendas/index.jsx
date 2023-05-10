import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import VendasServices from '../../services/VendasServices';
// import ClientesServices from '../../services/ClientesServices';
import { Pagina1 } from './Pagina1';
import { Pagina2 } from './Pagina2';
import { Pagina3 } from './Pagina3';

export const Vendas = () => {
  // Hook para controle das páginas de formulários
  const [pagina, setPagina] = useState(1);

  // Hook e função para controle e envio do objeto Vendas
  const dadosVenda = {
    id: 0,
    data_venda: '',
    id_produto: 0,
    id_estoque: 0,
    id_cliente: 0,
    id_endereco: 0,
    id_motorista: 0,
    id_veiculo: '',
    quantidade: 0,
    preco_total: 0,
    nome_cliente: '',
    endereco: '',
    motorista: '',
  };

  return (
    <>
      <Form>
        {pagina === 1 && <Pagina1 />}
        {pagina === 2 && <Pagina2 />}
        {pagina === 3 && <Pagina3 />}
      </Form>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={{ span: 6, offset: 3 }}>
            <ButtonGroup aria-label='Basic example'>
              {pagina > 1 && pagina <= 3 && (
                <Button
                  className='mx-1'
                  variant='danger'
                  onClick={(e) => {
                    setPagina((s) => s - 1);
                  }}
                >
                  &lt; Retornar
                </Button>
              )}

              {pagina <= 3 && (
                <Button
                  className='mx-1'
                  variant='success'
                  onClick={(e) => {
                    setPagina((s) => s + 1);
                  }}
                >
                  Continuar &gt;
                </Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
