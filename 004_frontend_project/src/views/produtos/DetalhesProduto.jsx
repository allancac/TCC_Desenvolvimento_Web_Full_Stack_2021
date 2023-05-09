import { useParams } from 'react-router-dom';

export const DetalhesProduto = () => {
  const { idProduto } = useParams();
  return (
    <>
      <h1>Detalhes do Produto {idProduto}</h1>
    </>
  );
};
