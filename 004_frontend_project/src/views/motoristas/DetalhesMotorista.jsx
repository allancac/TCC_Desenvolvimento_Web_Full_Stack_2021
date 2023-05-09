import { useParams } from 'react-router-dom';

export const DetalhesMotorista = () => {
  const { idMotorista } = useParams();
  return (
    <>
      <h1>Detalhes do Motorista {idMotorista}</h1>
    </>
  );
};
