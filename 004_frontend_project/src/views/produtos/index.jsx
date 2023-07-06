import { Container, Row, Col } from 'react-bootstrap';
import { CartaoProduto as Cartao } from '../../components/Cartoes';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { menuProdutos } from '../../components/Aside/listaMenuLateral';
import setMenuLateral from '../../redux/actions/menuLateralActions';
import ProdutosServices from '../../services/ProdutosServices';
import { Paginacao } from '../../components/Paginacao/Paginacao';
import BasicSpinner from '../../components/Spinners/basicSpinner';

export const Produtos = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [produtos, setProdutos] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Produtos.
  const buscarProdutos = async () => {
    const produtosServices = new ProdutosServices();
    try {
      const resultado = await produtosServices.buscarListaProdutos(
        offset,
        limit
      );

      setProdutos(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de produtos. Monitora a variável Offset
  useEffect(() => {
    buscarProdutos();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuProdutos));
  }, []);

  return (
    <>
      <h1>
        Total de Produtos: <strong>{total}</strong>
      </h1>
      <hr />
      {produtos.length === 0 ? (
        <Row className='text-center align-middle'>
          <Col style={{ height: '300px' }}>
            <h2>Aguarde...</h2>
            <br />
            <BasicSpinner />
          </Col>
        </Row>
      ) : (
        <Container>
          <Row>
            {produtos.map((produto) => (
              <Col key={produto.id} lg={4} sm={6}>
                <Cartao produto={produto} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Paginacao
                total={total}
                limit={limit}
                offset={offset}
                alteraPagina={alteraPagina}
              />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};
