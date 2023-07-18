import { Route, Routes } from "react-router-dom";
import { Main } from "../views/main";
import { NotFound } from "../views/notFound.jsx";
import ClientesRoutes from "./clientes/ClientesRoutes";
import VeiculosRoutes from "./veiculos/VeiculosRoutes";
import MotorisasRoutes from "./motoristas/MotoristasRoutes";
import ProdutosRoutes from "./produtos/ProdutosRoutes";
import EstoquesRoutes from "./estoques/EstoquesRoutes";
import VendasRoutes from "./vendas/VendasRoutes";
import UsuariosRoutes from "./usuarios/UsuariosRoutes";
import {Signin} from "../views/signin/index";

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Signin />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/clientes/*" element={<ClientesRoutes />} />
      <Route path="/veiculos/*" element={<VeiculosRoutes />} />
      <Route path="/motoristas/*" element={<MotorisasRoutes />} />
      <Route path="/produtos/*" element={<ProdutosRoutes />} />
      <Route path="/estoques/*" element={<EstoquesRoutes />} />
      <Route path="/vendas/*" element={<VendasRoutes />} />
      <Route path="/usuarios/*" element={<UsuariosRoutes />} />
    </Routes>
  );
};
