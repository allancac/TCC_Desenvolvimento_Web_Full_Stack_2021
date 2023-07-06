import { Route, Routes } from 'react-router-dom';
import { Produtos } from '../../views/produtos';
import { CadastrarProduto } from '../../views/produtos/CadastrarProduto';
import { BuscarProduto } from '../../views/produtos/BuscarProduto';
import { DetalhesProduto } from '../../views/produtos/DetalhesProdutos';

const ProdutosRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Produtos />} />
      <Route path='/cadastrar' element={<CadastrarProduto />} />
      <Route path='/buscar/' element={<BuscarProduto />} />
      <Route path='/detalhes/:idProduto' element={<DetalhesProduto />} />
    </Routes>
  );
};

export default ProdutosRoutes;
