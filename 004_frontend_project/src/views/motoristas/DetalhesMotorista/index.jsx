import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MotoristasServices from '../../../services/MotoristasServices';
import { DetalharMotorista } from './DetalharMotorista';
import { AlterarMotorista } from './AlterarMotorista';
import { ExcluirMotorista } from './ExcluirMotorista';

export const DetalhesMotorista = () => {
  const { cpf } = useParams();
  const [motorista, setMotorista] = useState({
    placa: '',
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
  });
  const [pagina, setPagina] = useState(0);

  const buscarMotorista = async (cpf) => {
    const motoristasServices = new MotoristasServices();
    try {
      const {
        data: [resultado],
      } = await motoristasServices.buscarMotorista(cpf);
      setMotorista((motorista) => resultado);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
      alert('Motorista não encontrado');
    }
  };

  useEffect(() => {
    buscarMotorista(cpf);
  }, [cpf, pagina]);

  return (
    <Container>
      {pagina === 0 && motorista.cpf && (
        <DetalharMotorista motorista={motorista} setPagina={setPagina} />
      )}
      {pagina === 1 && (
        <AlterarMotorista motorista={motorista} setPagina={setPagina} />
      )}
      {pagina === 2 && (
        <ExcluirMotorista motorista={motorista} setPagina={setPagina} />
      )}
    </Container>
  );
};
