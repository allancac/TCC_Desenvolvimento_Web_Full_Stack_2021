import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setSession } from "../../redux/actions/sessionActions";
import SessionServices from "../../services/SessionServices";

export const Header = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const userService = new SessionServices();
      const logout = await userService.logoutSession();
      dispatch(setSession(null));
    } catch (error) {
      console.error("Erro ao fazer o Logout do usuário:", error);
    }
  };
  return (
    <Navbar bg="secondary" variant="dark" expand="md" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MINERADORA S.A.</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "350px" }}
            navbarScroll
          >
            <LinkContainer to="/vendas">
              <Nav.Link>Vendas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/clientes">
              <Nav.Link>Clientes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/veiculos">
              <Nav.Link>Veículos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/motoristas">
              <Nav.Link>Motoristas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/produtos">
              <Nav.Link>Produtos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/estoques">
              <Nav.Link>Estoques</Nav.Link>
            </LinkContainer>
            {user.perfil !== "vendedor" && (
              <LinkContainer to="/usuarios">
                <Nav.Link>Usuários</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/relatorios">
              <Nav.Link disabled>Relatórios</Nav.Link>
            </LinkContainer>
          </Nav>

          <DropdownButton
            id="dropdown-button-dark"
            variant="secondary"
            title={`${user.nomeUsuario}`}
            data-bs-theme="dark"
          >
            <Dropdown.Item>Meu perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
