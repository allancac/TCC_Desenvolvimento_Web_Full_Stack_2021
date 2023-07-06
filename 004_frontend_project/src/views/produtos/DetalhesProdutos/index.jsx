import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProdutosServices from '../../../services/ProdutosServices';
import { DetalharProduto } from './DetalharProduto';
import { AlterarProduto } from './AlterarProduto';
import { ExcluirProduto } from './ExcluirProduto';

export const DetalhesProduto = () => {
  const { idProduto } = useParams();
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    Endereco: [],
  });
  const [pagina, setPagina] = useState(0);

  const buscarProduto = async (id) => {
    const produtosServices = new ProdutosServices();
    try {
      const {
        data: [resultado],
      } = await produtosServices.buscarProduto(id);
      setProduto((produto) => resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
      alert('Produto não encontrado');
    }
  };

  useEffect(() => {
    buscarProduto(idProduto);
  }, [idProduto, pagina]);

  return (
    <Container>
      {pagina === 0 && produto.id && (
        <DetalharProduto produto={produto} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarProduto produto={produto} setPagina={setPagina} />
      )}
      {pagina === 2 && (
        <ExcluirProduto produto={produto} setPagina={setPagina} />
      )}
    </Container>
  );
};
