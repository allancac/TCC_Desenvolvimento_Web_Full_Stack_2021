import { Route, Routes } from 'react-router-dom';
import { Estoques } from '../../views/estoques';
import { CadastrarEstoque } from '../../views/estoques/CadastrarEstoque';
import { BuscarEstoque } from '../../views/estoques/BuscarEstoque';
import { DetalhesEstoque } from '../../views/estoques/DetalhesEstoque';

const EstoquesRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Estoques />} />
      <Route path='/cadastrar' element={<CadastrarEstoque />} />
      <Route path='/buscar/' element={<BuscarEstoque />} />
      <Route path='/detalhes/:idEstoque' element={<DetalhesEstoque />} />
    </Routes>
  );
};

export default EstoquesRoutes;
