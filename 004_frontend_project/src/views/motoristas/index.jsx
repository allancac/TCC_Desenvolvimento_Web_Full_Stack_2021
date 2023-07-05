import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { menuMotoristas } from '../../components/Aside/listaMenuLateral';
import setMenuLateral from '../../redux/actions/menuLateralActions';
import MotoristasServices from '../../services/MotoristasServices';
import BasicSpinner from '../../components/Spinners/basicSpinner';
import { CartaoMotorista as Cartao } from '../../components/Cartoes';
import { Paginacao } from '../../components/Paginacao/Paginacao';

export const Motoristas = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [motoristas, setMotoristas] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Motoristas.
  const buscarMotoristas = async () => {
    const motoristasServices = new MotoristasServices();
    try {
      const resultado = await motoristasServices.buscarListaMotoristas(
        offset,
        limit
      );

      setMotoristas(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de motoristas. Monitora a variável Offset
  useEffect(() => {
    buscarMotoristas();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuMotoristas));
  }, []);
  return (
    <>
      <h1>
        Total de Motoristas: <strong>{total}</strong>
      </h1>
      <hr />
      {motoristas.length === 0 ? (
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
            {motoristas.map((motorista) => (
              <Col key={motorista.cpf} lg={4} sm={6}>
                <Cartao motorista={motorista} />
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
