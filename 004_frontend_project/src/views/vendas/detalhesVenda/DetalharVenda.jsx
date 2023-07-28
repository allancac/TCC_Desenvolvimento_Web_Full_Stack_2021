import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col, Table } from "react-bootstrap";

export const DetalharVenda = ({ venda, setPagina }) => {
  return (
    <>
      <h2>Detalhes da Venda</h2>
      <hr/>
      <Container>
        {venda.id && (
          <>
            <Row>
              <Table responsive="sm" hover striped bordered size="sm">
                <thead>
                  <tr>
                    <th colSpan={2} className=" text-light bg-secondary ">
                      Informações da Venda
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>ID da Venda</th>
                    <td>{venda.id}</td>
                  </tr>
                  <tr>
                    <th>Quantidade</th>
                    <td>
                      {venda.quantidade} m<sup>3</sup>
                    </td>
                  </tr>
                  <tr>
                    <th>Valor Total</th>
                    <td>R$ {venda.preco_total}</td>
                  </tr>
                  <tr>
                    <th>Data da Venda</th>
                    <td>{`${new Date(venda.createdAt).toLocaleString()}`}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table responsive="sm" hover striped bordered size="sm">
                <thead>
                  <tr>
                    <th colSpan={2} className=" text-light bg-secondary ">
                      Informações do Cliente
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>ID do Cliente</th>
                    <td>{venda.cliente.id}</td>
                  </tr>
                  <tr>
                    <th>Nome do Cliente</th>
                    <td>{venda.cliente.nome}</td>
                  </tr>
                  <tr>
                    <th>CNPJ do Cliente</th>
                    <td>{venda.cliente.cnpj}</td>
                  </tr>
                  <tr>
                    <th>E-mail do Cliente</th>
                    <td>{venda.cliente.email}</td>
                  </tr>
                  <tr>
                    <th>Telefone de contato</th>
                    <td>{venda.cliente.telefone}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table responsive="sm" hover striped bordered size="sm">
                <thead>
                  <tr>
                    <th colSpan={2} className=" text-light bg-secondary ">
                      Informações do Produto e Estoque
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Nome do Produto</th>
                    <td>{venda.produto.nome}</td>
                  </tr>
                  <tr>
                    <th>Tipo do Produto</th>
                    <td>{venda.produto.tipo}</td>
                  </tr>
                  <tr>
                    <th>Descrição do Produto</th>
                    <td>{venda.produto.descricao}</td>
                  </tr>
                  <tr>
                    <th>
                      Preço p/ m<sup>3</sup>
                    </th>
                    <td>R$ {venda.produto.preco}</td>
                  </tr>
                  <tr>
                    <th>Estoque de origem</th>
                    <td>{venda.estoque.tipo_estoque}</td>
                  </tr>
                  <tr>
                    <th>Localização do Estoque</th>
                    <td>{venda.estoque.localizacao}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              <Table responsive="sm" hover striped bordered size="sm">
                <thead>
                  <tr>
                    <th colSpan={2} className=" text-light bg-secondary ">
                      Informações do Vendedor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>ID do Vendedor</th>
                    <td>{venda.usuario.id}</td>
                  </tr>
                  <tr>
                    <th>Nome do Vendedor</th>
                    <td>{venda.usuario.nomeUsuario}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>

            <hr />
          </>
        )}

        <Row>
          <Col className="text-center">
            <Button

              className="mx-4"
              variant="danger"
              onClick={() => {
                setPagina((pagina) => 1);
              }}
            >
              Cancelar Venda
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
