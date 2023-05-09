import { useParams } from 'react-router-dom';

export const DetalhesVeiculo = () => {
  const { placa } = useParams();
  return (
    <>
      <h1>Detalhes do Veículo placa {placa}</h1>
    </>
  );
};
