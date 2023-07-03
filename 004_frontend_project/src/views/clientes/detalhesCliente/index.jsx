import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClientesServices from '../../../services/ClientesServices';
import { DetalharCliente } from './DetalharCliente';
import { AlterarCliente } from './AlterarCliente';
import { ExcluirCliente } from './ExcluirCliente';

export const DetalhesCliente = () => {
  const { idCliente } = useParams();
  const [cliente, setCliente] = useState({
    id: '',
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    Endereco: [],
  });
  const [pagina, setPagina] = useState(0);

  const buscarCliente = async (id) => {
    const clientesServices = new ClientesServices();
    try {
      const {
        data: [resultado],
      } = await clientesServices.buscarCliente(id);
      setCliente((cliente) => resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
      alert('Cliente não encontrado');
    }
  };

  useEffect(() => {
    buscarCliente(idCliente);
  }, [idCliente, pagina]);

  return (
    <Container>
      {pagina === 0 && cliente.id && (
        <DetalharCliente cliente={cliente} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarCliente cliente={cliente} setPagina={setPagina} />
      )}
      {pagina === 2 && (
        <ExcluirCliente cliente={cliente} setPagina={setPagina} />
      )}
    </Container>
  );
};
