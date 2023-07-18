import { useState } from "react";
import { Button, Form, Container, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const getGoogleOAuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: "http://localhost:5500/google/oauth",
      client_id:
        "768424978127-gpducn6kkqsacqj6pndd5g58mqfjdd5d.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  };

  return (
    <Container className="bg-dark">
      <Row>
        <Col
          className="p-5 border position-absolute top-50 start-50 translate-middle shadow"
          lg={5}
          md={8}
          xs={10}
        >
          <h1>Sistema de Vendas</h1>
          <hr />

          <Form className="mt-5" >
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" htmlFor="email">
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  id="email"
                  type="email"
                  required
                  placeholder="Digite o e-mail do usuário"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} htmlFor="senha">
                Senha:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  id="senha"
                  required
                  type="password"
                  placeholder="Digite a senha do usuário"
                  onChange={(e) => {
                    setSenha(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <Col sm={{ span: 6, offset: 4 }}>
                <Button lg={6} variant="success" type="submit">
                  Entrar no Sistema
                </Button>
              </Col>
            </Row>
            <hr />
          </Form>
          <Row >
            <Col md={{ span: 8, offset: 2 }} className='text-center'>
              <Button
                lg={6}
                variant="primary"
                type="submit"
                href={`${getGoogleOAuthURL()}`}
              >
                Entrar com o Google
              </Button>
              <LinkContainer to={"/signup/"}>
                <Nav.Link>Cadastrar novo usuário</Nav.Link>
              </LinkContainer>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  );
};
