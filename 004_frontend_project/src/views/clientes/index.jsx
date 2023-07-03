import { Container, Row, Col } from 'react-bootstrap';
import { CartaoCliente as Cartao } from '../../components/Cartoes';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { menuClientes } from '../../components/Aside/listaMenuLateral';
import setMenuLateral from '../../redux/actions/menuLateralActions';
import ClientesServices from '../../services/ClientesServices';
import { Paginacao } from '../../components/Paginacao/Paginacao';
import BasicSpinner from '../../components/Spinners/basicSpinner';

export const Clientes = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [clientes, setClientes] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Clientes.
  const buscarClientes = async () => {
    const clientesServices = new ClientesServices();
    try {
      const resultado = await clientesServices.buscarListaClientes(
        offset,
        limit
      );

      setClientes(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log('Erro ao requisitar:', error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de clientes. Monitora a variável Offset
  useEffect(() => {
    buscarClientes();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuClientes));
  }, []);

  return (
    <>
      <h1>
        Total de Clientes: <strong>{total}</strong>
      </h1>
      <hr />
      {clientes.length === 0 ? (
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
            {clientes.map((cliente) => (
              <Col key={cliente.id} lg={4} sm={6}>
                <Cartao cliente={cliente} />
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
