import { Route, Routes } from "react-router-dom";
import { Usuarios } from "../../views/usuarios";
import { DetalhesUsuario } from "../../views/usuarios/DetalhesUsuario";
import { CadastrarUsuarios } from "../../views/usuarios/CadastrarUsuarios.jsx";

const UsuariosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Usuarios />} />
      <Route path='/cadastrar' element={<CadastrarUsuarios />} />
      <Route path="/detalhes/:id" element={<DetalhesUsuario />} />
    </Routes>
  );
};

export default UsuariosRoutes;
