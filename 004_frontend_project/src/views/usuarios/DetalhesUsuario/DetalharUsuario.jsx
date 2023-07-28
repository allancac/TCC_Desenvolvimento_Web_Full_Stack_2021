import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export const DetalharUsuario = ({ usuario, setPagina }) => {
  return (
    <>
      <h2>Detalhes do Usuario {usuario.nomeUsuario}</h2>
      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="idUsuario">ID do Usuario:</Form.Label>
            <Form.Control id="idUsuario" value={usuario.id} disabled readOnly />
          </Form.Group>
          <Form.Group as={Col} md={2} className="mb-4 ">
            <Form.Label htmlFor="status">Status:</Form.Label>
            <Form.Check
              id="status"
              readOnly
              checked={usuario.ativo}
              type="switch"
              label={usuario.ativo ? "Ativo" : "Inativo"} // Display "ligado" if usuario.ativo is true, and "desligado" otherwise
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className="mb-4 ">
            <Form.Label htmlFor="perfilUsuario">Perfil do Usuário:</Form.Label>
            <Form.Select id="perfilUsuario" readOnly disabled>
              <option>{usuario.perfil}</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="nome">Nome:</Form.Label>
            <Form.Control id="nome" value={usuario.nome} disabled readOnly />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="sobrenome">Sobrenome:</Form.Label>
            <Form.Control
              id="sobrenome"
              value={usuario.sobrenome}
              disabled
              readOnly
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="nomeUsuario">Nome de Usuário:</Form.Label>
            <Form.Control
              id="nomeUsuario"
              value={usuario.nomeUsuario}
              disabled
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="emailUsuario">E-mail do Usuário:</Form.Label>
            <Form.Control
              id="emailUsuario"
              value={usuario.email}
              disabled
              readOnly
            />
          </Form.Group>
        </Row>

        <hr />

        <Row>
          <Col className="text-center">
            <Button
              className="mx-4"
              variant="warning"
              onClick={() => {
                setPagina((pagina) => 1);
              }}
            >
              Alterar
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
