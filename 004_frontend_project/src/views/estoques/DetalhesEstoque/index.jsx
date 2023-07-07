import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EstoquesServices from '../../../services/EstoqueServices';
import { DetalharEstoque } from './DetalharEstoque';
import { AlterarEstoque } from './AlterarEstoque';
import { ExcluirEstoque } from './ExcluirEstoque';

export const DetalhesEstoque = () => {
  const { idEstoque } = useParams();
  const [estoque, setEstoque] = useState({
    id: 0,
    id_produto: 0,
    localizacao: '',
    tipo_estoque: '',
    volume: 0,
    capacidade_maxima: 0,
  });
  const [pagina, setPagina] = useState(0);

  const buscarEstoque = async (id) => {
    const estoquesServices = new EstoquesServices();
    try {
      const {
        data: [resultado],
      } = await estoquesServices.buscarEstoque(id);
      setEstoque((estoque) => resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
      alert('Estoque não encontrado');
    }
  };

  useEffect(() => {
    buscarEstoque(idEstoque);
  }, [idEstoque, pagina]);

  return (
    <Container>
      {pagina === 0 && estoque.id && (
        <DetalharEstoque estoque={estoque} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarEstoque estoque={estoque} setPagina={setPagina} />
      )}
      {pagina === 2 && (
        <ExcluirEstoque estoque={estoque} setPagina={setPagina} />
      )}
    </Container>
  );
};
