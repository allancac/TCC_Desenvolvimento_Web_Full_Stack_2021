import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { Header } from "./components/Header";
import { AsideMenu } from "./components/Aside";
import { Signin } from "./views/signin";
import { ApplicationRoutes } from "./routes/ApplicationRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./redux/actions/sessionActions";
import SessionServices from "./services/SessionServices";

export const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userService = new SessionServices();
        const userDetails = await userService.getSession();

        dispatch(setSession(userDetails));
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      }
    };

    if (!user) {
      fetchUserDetails();
    }
  }, [dispatch, user]);

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
                <ApplicationRoutes user={user} />
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
