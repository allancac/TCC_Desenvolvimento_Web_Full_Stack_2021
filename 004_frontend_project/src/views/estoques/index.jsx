import { Container, Row, Col } from 'react-bootstrap';
import { CartaoEstoque as Cartao } from '../../components/Cartoes';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { menuEstoques } from '../../components/Aside/listaMenuLateral';
import setMenuLateral from '../../redux/actions/menuLateralActions';
import EstoquesServices from '../../services/EstoqueServices';
import { Paginacao } from '../../components/Paginacao/Paginacao';
import BasicSpinner from '../../components/Spinners/basicSpinner';

export const Estoques = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [estoques, setEstoques] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Estoques.
  const buscarEstoques = async () => {
    const estoquesServices = new EstoquesServices();
    try {
      const resultado = await estoquesServices.buscarListaEstoques(
        offset,
        limit
      );

      setEstoques(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de estoques. Monitora a variável Offset
  useEffect(() => {
    buscarEstoques();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuEstoques));
  }, []);

  return (
    <>
      <h1>
        Total de Estoques: <strong>{total}</strong>
      </h1>
      <hr />
      {estoques.length === 0 ? (
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
            {estoques.map((estoque) => (
              <Col key={estoque.id} lg={4} sm={6}>
                <Cartao estoque={estoque} />
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
