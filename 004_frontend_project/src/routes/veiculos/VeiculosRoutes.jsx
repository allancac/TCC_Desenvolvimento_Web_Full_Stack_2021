import { Route, Routes } from 'react-router-dom';
import { Veiculos } from '../../views/veiculos';
import { CadastrarVeiculo } from '../../views/veiculos/CadastrarVeiculo.jsx';
import { BuscarVeiculo } from '../../views/veiculos/BuscarVeiculo.jsx';
import { DetalhesVeiculo } from '../../views/veiculos/detalhesVeiculo';

const VeiculosRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Veiculos />} />
      <Route path='/cadastrar' element={<CadastrarVeiculo />} />
      <Route path='/buscar' element={<BuscarVeiculo />} />
      <Route path='/detalhes/:placa' element={<DetalhesVeiculo />} />
    </Routes>
  );
};

export default VeiculosRoutes;
