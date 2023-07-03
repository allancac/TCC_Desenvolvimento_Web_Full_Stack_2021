import { Button, Nav, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

export const AsideMenu = () => {
  const menuLateral = useSelector((state) => state.menuLateral);

  return (
    <aside>
      <Stack gap={1}>
        {menuLateral.map((item, ind) => (
          <Button key={ind} variant='secondary' size='md'>
            <LinkContainer to={item.linkTo}>
              <Nav.Link>{item.submenuTitle}</Nav.Link>
            </LinkContainer>
          </Button>
        ))}
      </Stack>
    </aside>
  );
};
