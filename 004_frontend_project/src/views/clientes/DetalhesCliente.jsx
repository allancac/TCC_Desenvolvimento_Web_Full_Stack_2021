import { useParams } from 'react-router-dom';

export const DetalhesCliente = () => {
  const { idCliente } = useParams();
  return (
    <>
      <h1>Detalhes do Cliente {idCliente}</h1>
    </>
  );
};
