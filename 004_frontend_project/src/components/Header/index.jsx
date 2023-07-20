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

export const Header = () => {
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
            <LinkContainer to="/usuarios">
              <Nav.Link>Usuários</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/relatorios">
              <Nav.Link disabled>Relatórios</Nav.Link>
            </LinkContainer>
          </Nav>

          <DropdownButton
            id="dropdown-button-dark"
            variant="secondary"
            title="Usuário"
            data-bs-theme="dark"
          >
            <Dropdown.Item>
              <LinkContainer to="/dashboard">
                <Nav.Link>Configurações</Nav.Link>
              </LinkContainer>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sair</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
