import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "./components/Header";
import { AsideMenu } from "./components/Aside";
import { Signin } from "./views/signin";
import { ApplicationRoutes } from "./routes/ApplicationRoutes";
import { useState } from "react";

export const App = () => {
  const userMock = { nomeUsuario: "Allan Chaves" };
  const [user, setUser] = useState(userMock);

  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Container fluid className="my-1">
            <Row>
              <Col lg={2} md={3} sm={12}>
                <AsideMenu />
              </Col>
              <Col lg={10} md={9} sm={12}>
                <ApplicationRoutes user={user}/>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
};
