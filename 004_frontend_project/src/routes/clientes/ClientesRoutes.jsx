import { Route, Routes } from 'react-router-dom';
import { Clientes } from '../../views/clientes';
import { CadastrarCliente } from '../../views/clientes/CadastrarCliente';
import { BuscarCliente } from '../../views/clientes/BuscarCliente';
import { DetalhesCliente } from '../../views/clientes/detalhesCliente';

const ClientesRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Clientes />} />
      <Route path='/cadastrar' element={<CadastrarCliente />} />
      <Route path='/buscar/' element={<BuscarCliente />} />
      <Route path='/detalhes/:idCliente' element={<DetalhesCliente />} />
    </Routes>
  );
};

export default ClientesRoutes;
