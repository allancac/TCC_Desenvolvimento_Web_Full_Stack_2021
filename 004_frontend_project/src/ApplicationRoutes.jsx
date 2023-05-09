import { Route, Routes } from 'react-router-dom';
import { Main } from './views/main';
import { Clientes } from './views/clientes';
import { DetalhesCliente } from './views/clientes/DetalhesCliente';
import { Veiculos } from './views/veiculos';
import { DetalhesVeiculo } from './views/veiculos/DetalhesVeiculo';
import { Motoristas } from './views/motoristas';
import { DetalhesMotorista } from './views/motoristas/DetalhesMotorista.jsx';
import { Produtos } from './views/produtos';
import { DetalhesProduto } from './views/produtos/DetalhesProduto';
import { Vendas } from './views/vendas/index';
import { DetalhesVenda } from './views/vendas/DetalhesVenda';
import { Estoques } from './views/estoques';
import { DetalhesEstoque } from './views/estoques/DetalhesEstoque';
import { NotFound } from './views/notFound.jsx';

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/clientes' element={<Clientes />} />
      <Route path='/clientes/:idCliente' element={<DetalhesCliente />} />
      <Route path='/veiculos' element={<Veiculos />} />
      <Route path='/veiculos/:placa' element={<DetalhesVeiculo />} />
      <Route path='/motoristas' element={<Motoristas />} />
      <Route path='/motoristas/:idMotorista' element={<DetalhesMotorista />} />
      <Route path='/produtos' element={<Produtos />} />
      <Route path='/produtos/:idProduto' element={<DetalhesProduto />} />
      <Route path='/vendas' element={<Vendas />} />
      <Route path='/vendas/:idVenda' element={<DetalhesVenda />} />
      <Route path='/estoques' element={<Estoques />} />
      <Route path='/estoques/:idEstoque' element={<DetalhesEstoque />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
