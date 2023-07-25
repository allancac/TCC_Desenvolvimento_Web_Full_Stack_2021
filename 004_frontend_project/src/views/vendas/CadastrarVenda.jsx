import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import { Pagina1 } from "./Pagina1";
import { Pagina2 } from "./Pagina2";
import { Pagina3 } from "./Pagina3";
import { Pagina4 } from "./Pagina4";

export const CadastrarVendas = () => {
  // Hook para controle das páginas de formulários
  const [pagina, setPagina] = useState(1);

  // Hook e função para controle e envio do objeto Vendas
  const dadosVenda = {
    id_usuario: null,
    id_produto: null,
    id_estoque: null,
    id_cliente: null,
    id_endereco: null,
    cpf_motorista: null,
    placa: null,
    quantidade: null,
    preco_total: null,
  };

  return (
    <>
      <Form>
        {pagina === 1 && <Pagina1 />}
        {pagina === 2 && <Pagina2 />}
        {pagina === 3 && <Pagina3 />}
        {pagina === 4 && <Pagina4 />}
      </Form>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={{ span: 6, offset: 3 }}>
            <ButtonGroup aria-label="Basic example">
              {pagina > 1 && pagina <= 4 && (
                <Button
                  className="mx-1"
                  variant="danger"
                  onClick={(e) => {
                    setPagina((s) => s - 1);
                  }}
                >
                  &lt; Retornar
                </Button>
              )}

              {pagina <= 3 && (
                <Button
                  className="mx-1"
                  variant="success"
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
