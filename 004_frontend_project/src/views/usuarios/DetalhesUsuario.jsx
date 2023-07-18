import { useParams } from 'react-router-dom';

export const DetalhesUsuario = () => {
  const { idUsuario } = useParams();
  return (
    <>
      <h1>Detalhes do Cliente {idUsuario}</h1>
    </>
  );
};
