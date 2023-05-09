import Button from 'react-bootstrap/Button';

export const AsideMenu = () => {
  return (
    <aside>
      <div className='d-grid gap-1'>
        <Button variant='secondary' size='lg'>
          Realizar Venda
        </Button>
        <Button variant='secondary' size='lg'>
          Consultar Vendas
        </Button>
      </div>
    </aside>
  );
};
