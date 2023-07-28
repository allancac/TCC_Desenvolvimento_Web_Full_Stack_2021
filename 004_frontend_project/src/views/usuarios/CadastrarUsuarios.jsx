import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UsuariosServices from "../../services/UsuariosServices";
import AlertDismissible from "../../components/Alerts/Alerts";

export const CadastrarUsuarios = () => {
  /************************************************
   * HOOKS de controle do componente
   ***********************************************/
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: "",
    heading: "",
    textArray: [],
  });
  //  Hook para controlar/armazenar a senha digitada pelo usuário
  const [senha, setSenha] = useState("");
  //  Hook para controlar/armazenar a confirmação da senha digitada pelo usuário
  const [confirmarSenha, setConfirmarSenha] = useState("");
  //   Hook para controlar/armazenar dados fornecidos pelos inputs referentes ao usuário
  const [novoUsuario, setNovoUsuario] = useState({
    nomeUsuario: "",
    nome: "",
    sobrenome: "",
    foto: "",
    ativo: false,
    email: "",
    senha: senha,
    perfil: "vendedor",
  });

  useEffect(() => {}, [novoUsuario]);

  useEffect(() => {
    if (senha === confirmarSenha) {
      setNovoUsuario((usuario) => ({
        ...usuario,
        senha: senha,
      }));
    }
  }, [senha, confirmarSenha]);

  /************************************************
   * Funções do componente
   ***********************************************/
  // Função responsável por cadastrar o Usuário.
  const finalizarCadastro = async () => {
    //  Instanciação da classe de serviço Usuário.
    const usuarioService = new UsuariosServices();

    try {
      // Enviar dados do usuário
      const usuarioCadastrado = await usuarioService.enviarDadosUsuario(
        novoUsuario
      );

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        return {
          variant: "success",
          heading: "Usuário Cadastrado",
          textArray: [`O usuário "${novoUsuario.nome}" foi cadastrado.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: "danger",
          heading: "Erro ao cadastrar usuário",
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  // Função para atualizar a senha no hook novoUsuario
  const atualizarSenha = (event) => {
    setSenha(event.target.value);
  };
  // Função para atualizar a confirmação da senha no hook novoUsuario
  const atualizarConfirmarSenha = (event) => {
    setConfirmarSenha(event.target.value);
  };

  return (
    <Form>
      <h2>Cadastrar Usuário</h2>
      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="nome">Nome:</Form.Label>
            <Form.Control
              id="nome"
              placeholder="Nome"
              value={novoUsuario.nome || ""}
              onChange={(event) => {
                setNovoUsuario((usuario) => ({
                  ...usuario,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="sobrenome">Sobrenome:</Form.Label>
            <Form.Control
              id="sobrenome"
              placeholder="Sobrenome"
              value={novoUsuario.sobrenome || ""}
              onChange={(event) => {
                setNovoUsuario((usuario) => ({
                  ...usuario,
                  sobrenome: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="nomeUsuario">Nome de Usuário:</Form.Label>
            <Form.Control
              id="nomeUsuario"
              placeholder="Nome de Usuário"
              value={novoUsuario.nomeUsuario || ""}
              onChange={(event) => {
                setNovoUsuario((usuario) => ({
                  ...usuario,
                  nomeUsuario: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="emailUsuario">E-mail do Usuário:</Form.Label>
            <Form.Control
              id="emailUsuario"
              placeholder="E-mail do Usuário"
              value={novoUsuario.email || ""}
              onChange={(event) => {
                setNovoUsuario((usuario) => ({
                  ...usuario,
                  email: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="senha">Senha:</Form.Label>
            <Form.Control
              type="password"
              id="senha"
              placeholder="Senha"
              value={senha}
              onChange={atualizarSenha}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="confirmarSenha">Confirmar Senha:</Form.Label>
            <Form.Control
              type="password"
              id="confirmarSenha"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={atualizarConfirmarSenha}
            />
          </Form.Group>
        </Row>
        <hr />
      </Container>
      <Container>
        <AlertDismissible
          show={showAlert}
          setShow={setShowAlert}
          content={msgAlert}
        />
        <Row className="justify-content-md-center  mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Button variant="success" onClick={finalizarCadastro}>
              Finalizar Cadastro
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
