import { Route, Routes } from 'react-router-dom';
import { Vendas } from '../../views/vendas';
import { DetalhesVenda } from '../../views/vendas/DetalhesVenda';

const VendasRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Vendas />} />
      <Route path='/:idVenda' element={<DetalhesVenda />} />
    </Routes>
  );
};

export default VendasRoutes;
