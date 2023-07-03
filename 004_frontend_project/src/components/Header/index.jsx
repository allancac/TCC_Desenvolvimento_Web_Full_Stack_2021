import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  return (
    <Navbar bg='secondary' variant='dark' expand='md' sticky='top'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>MINERADORA S.A.</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='navbarScroll' />

        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '350px' }}
            navbarScroll
          >
            <LinkContainer to='/vendas'>
              <Nav.Link>Vendas</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/clientes'>
              <Nav.Link>Clientes</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/veiculos'>
              <Nav.Link>Veículos</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/motoristas'>
              <Nav.Link>Motoristas</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/produtos'>
              <Nav.Link>Produtos</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/estoques'>
              <Nav.Link>Estoques</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/usuarios'>
              <Nav.Link>Usuários</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/relatorios'>
              <Nav.Link disabled>Relatórios</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav>
            <NavDropdown
              className='justify-content-end'
              title='Usuário'
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item href='#action3'>
                Mais informações
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
