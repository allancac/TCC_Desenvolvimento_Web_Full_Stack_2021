import { Route, Routes } from 'react-router-dom';
import { Usuarios } from '../../views/usuarios';
import { DetalhesUsuario } from '../../views/usuarios/DetalhesUsuario';

const UsuariosRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Usuarios />} />
      <Route path='/:idUsuario' element={<DetalhesUsuario />} />
    </Routes>
  );
};

export default UsuariosRoutes;
