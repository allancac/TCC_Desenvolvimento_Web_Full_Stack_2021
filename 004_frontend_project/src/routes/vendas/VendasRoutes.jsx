import { Route, Routes } from "react-router-dom";
import { Vendas } from "../../views/vendas";
import { CadastrarVendas } from "../../views/vendas/CadastrarVenda";
import  {BuscarVenda}  from "../../views/vendas/BuscarVenda";
import { DetalhesVenda } from "../../views/vendas/detalhesVenda";

const VendasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Vendas />} />
      <Route path="/cadastrar" element={<CadastrarVendas />} />
      <Route path="/buscar" element={<BuscarVenda />} />
      <Route path="/detalhes/:idVenda" element={<DetalhesVenda />} />
    </Routes>
  );
};

export default VendasRoutes;
