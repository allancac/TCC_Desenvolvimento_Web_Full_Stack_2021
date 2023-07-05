import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CartaoVeiculo as Cartao } from '../../components/Cartoes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { menuVeiculos } from '../../components/Aside/listaMenuLateral';
import setMenuLateral from '../../redux/actions/menuLateralActions';
import VeiculosServices from '../../services/VeiculosServices';
import { Paginacao } from '../../components/Paginacao/Paginacao';
import BasicSpinner from '../../components/Spinners/basicSpinner';

export const Veiculos = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [veiculos, setVeiculos] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Veículos.
  const buscarVeiculos = async () => {
    const veiculosServices = new VeiculosServices();
    try {
      const resultado = await veiculosServices.buscarListaVeiculos(
        offset,
        limit
      );

      setVeiculos(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de veículos. Monitora a variável Offset
  useEffect(() => {
    buscarVeiculos();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuVeiculos));
  }, []);
  return (
    <>
      <h1>
        Total de Veículos: <strong>{total}</strong>
      </h1>
      <hr />
      {veiculos.length === 0 ? (
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
            {veiculos
            .map((veiculo) => (
              <Col key={veiculo.id} lg={4} sm={6}>
                <Cartao veiculo={veiculo} />
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
