import { useParams } from 'react-router-dom';

export const DetalhesVenda = () => {
  const { idVenda } = useParams();
  return (
    <>
      <h1>Detalhes da Venda {idVenda}</h1>
    </>
  );
};
