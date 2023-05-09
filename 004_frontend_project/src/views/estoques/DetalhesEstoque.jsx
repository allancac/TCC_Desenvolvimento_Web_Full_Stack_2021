import { useParams } from 'react-router-dom';

export const DetalhesEstoque = () => {
  const { idEstoque } = useParams();
  return (
    <>
      <h1>Detalhes do Estoque {idEstoque}</h1>
    </>
  );
};
