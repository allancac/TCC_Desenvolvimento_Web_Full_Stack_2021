import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VeiculosServices from '../../../services/VeiculosServices';
import { DetalharVeiculo } from './DetalharVeiculo.jsx';
import { AlterarVeiculo } from './AlterarVeiculo.jsx';
import { ExcluirVeiculo } from './ExcluirVeiculo.jsx';

export const DetalhesVeiculo = () => {
  const { placa } = useParams();
  const [veiculo, setVeiculo] = useState({
    placa: '',
    id_cliente: '',
    marca: '',
    modelo: '',
    altura_cacamba: '',
    largura_cacamba: '',
    comprimento_cacamba: '',
  });

  const [pagina, setPagina] = useState(0);

  const buscarVeiculo = async (placa) => {
    const veiculosServices = new VeiculosServices();
    try {
      const {
        data: [resultado],
      } = await veiculosServices.buscarVeiculo(placa);
      setVeiculo((veiculo) => resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
      alert('Veículo não encontrado');
    }
  };

  useEffect(() => {
    buscarVeiculo(placa);
  }, [placa, pagina]);
  return (
    <Container>
      {pagina === 0 && veiculo.placa && (
        <DetalharVeiculo veiculo={veiculo} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarVeiculo veiculo={veiculo} setPagina={setPagina} />
      )}
      {pagina === 2 && (
        <ExcluirVeiculo veiculo={veiculo} setPagina={setPagina} />
      )}
    </Container>
  );
};
