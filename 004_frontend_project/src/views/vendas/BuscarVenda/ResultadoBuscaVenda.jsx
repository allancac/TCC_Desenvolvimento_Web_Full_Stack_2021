import React from "react";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const ResultadoBuscaVenda = ({ vendas }) => {
  return (
    <div>
      <h2>Resultados da Busca</h2>
      {vendas && vendas.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Venda</th>
              <th>ID Cliente</th>
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
                <td>{venda.cliente.id}</td>
                <td>{venda.cliente.nome}</td>
                <td>{venda.produto.nome}</td>
                <td>
                  {venda.quantidade} m<sup>3</sup>
                </td>
                <td>R$ {venda.preco_total}</td>
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
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default ResultadoBuscaVenda;
