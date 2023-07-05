import { Route, Routes } from 'react-router-dom';
import { Motoristas } from '../../views/motoristas';
import { CadastrarMotoristas } from '../../views/motoristas/CadastrarMotoristas';
import { BuscarMotoristas } from '../../views/motoristas/BuscarMotoristas';
import { DetalhesMotorista } from '../../views/motoristas/DetalhesMotorista';

const MotorisasRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Motoristas />} />
      <Route path='/cadastrar' element={<CadastrarMotoristas />} />
      <Route path='/buscar' element={<BuscarMotoristas />} />
      <Route path='/detalhes/:cpf' element={<DetalhesMotorista />} />
      
    </Routes>
  );
};

export default MotorisasRoutes;
