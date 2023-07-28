import { Container, Row, Col, Table, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { menuUsuarios } from "../../components/Aside/listaMenuLateral";
import setMenuLateral from "../../redux/actions/menuLateralActions";
import UsuariosServices from "../../services/UsuariosServices";
import BasicSpinner from "../../components/Spinners/basicSpinner";
import { Paginacao } from "../../components/Paginacao/Paginacao";

export const Usuarios = () => {
  //  Hook para disparar as Actions do REDUX
  const dispatch = useDispatch();

  //  Hooks de controle de estado do componente.
  const [usuarios, setUsuarios] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  //  Função Assíncrona para buscar a lista de Usuarios.
  const buscarUsuarios = async () => {
    const usuariosServices = new UsuariosServices();
    try {
      const resultado = await usuariosServices.buscarListaUsuarios(
        offset,
        limit
      );

      setUsuarios(resultado.data);
      setTotal(resultado.metadata.countAll);
    } catch (error) {
      console.log("Erro ao requisitar:", error);
    }
  };

  //  Função para alterar a página através da alteração da variável de estado Offset.
  const alteraPagina = (novoOffset) => {
    setOffset(novoOffset);
  };

  //  Hook de ciclo de vida para buscar a lista de usuarios. Monitora a variável Offset
  useEffect(() => {
    buscarUsuarios();
  }, [offset]);

  //  Hook de ciclo de vida para criar o Menu Lateral na montagem do componente
  useEffect(() => {
    // Dipatch do REDUX para atualizar o Menu Laretal
    dispatch(setMenuLateral(menuUsuarios));
  }, []);
  return (
    <>
      <h1>
        Total de Usuarios: <strong>{total}</strong>
      </h1>
      <hr />
      {usuarios.length === 0 ? (
        <Row className="text-center align-middle">
          <Col style={{ height: "300px" }}>
            <h2>Aguarde...</h2>
            <br />
            <BasicSpinner />
          </Col>
        </Row>
      ) : (
        <Container>
          <Row>
            <Table striped bordered hover responsive>
              <tr>
                <th>Nome do Usuário</th>
                <th>Status</th>
                <th>Perfil</th>
                <th>Detalhes</th>
              </tr>
              {usuarios.map((usuario) => (
                <tr>
                  <td>{usuario.nomeUsuario}</td>
                  <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
                  <td>{usuario.perfil}</td>
                  <td>
                    <LinkContainer to={`/usuarios/detalhes/${usuario.id}`}>
                      <Nav.Link className="text-primary ">
                        <u>Ver detalhes</u>
                      </Nav.Link>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </Table>
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
