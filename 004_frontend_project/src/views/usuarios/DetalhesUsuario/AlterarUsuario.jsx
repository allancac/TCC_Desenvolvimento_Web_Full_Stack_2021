import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import UsuariosServices from "../../../services/UsuariosServices";
import AlertDismissible from "../../../components/Alerts/Alerts";

export const AlterarUsuario = ({ usuario, setPagina }) => {
  const [usuarioAlterado, setUsuarioAlterado] = useState(usuario);
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: "",
    heading: "",
    textArray: [],
  });

  const atualizarUsuario = async (usuarioAlterado) => {
    //  Instanciação das classes de serviço Usuario
    const usuarioService = new UsuariosServices();

    try {
      // Enviar dados do usuario
      const resultado = await usuarioService.atualizarDadosUsuario(usuario.id, {
        ...usuarioAlterado,
        nomeUsuario: usuarioAlterado.nomeUsuario,
        nome: usuarioAlterado.nome,
        sobrenome: usuarioAlterado.sobrenome,
        ativo: usuarioAlterado.ativo,
        email: usuarioAlterado.email,
        perfil: usuarioAlterado.perfil,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: "success",
          heading: "Usuário Alterado",
          textArray: [`O Usuário "${data.id}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
      setPagina((pagina) => 0);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: "danger",
          heading: "Erro ao Alterar o Usuário",
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <h2>Alterar dados do Usuário</h2>
      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="idCliente">ID do Cliente:</Form.Label>
            <Form.Control
              id="idCliente"
              placeholder="ID do cliente"
              value={usuarioAlterado.id || ""}
              readOnly
              disabled
            />
          </Form.Group>

          <Form.Group as={Col} md={2} className="mb-4 ">
            <Form.Label htmlFor="status">Status:</Form.Label>
            <Form.Check
              id="status"
              checked={usuarioAlterado.ativo}
              type="switch"
              label={usuario.ativo ? "Ativo" : "Inativo"} // Display "ligado" if usuario.ativo is true, and "desligado" otherwise
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
                  ativo: !usuarioAlterado.ativo,
                }));
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md={4} className="mb-4 ">
            <Form.Label htmlFor="perfilUsuario">Perfil do Usuário:</Form.Label>
            <Form.Select
              id="perfilUsuario"
              value={usuarioAlterado.perfil}
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
                  perfil: event.target.value,
                }));
              }}
            >
              <option>{usuarioAlterado.perfil}</option>
              {["vendedor", "gerente", "administrador"]
                .filter((perfil) => perfil !== usuarioAlterado.perfil)
                .map((perfil) => {
                  return <option value={perfil}>{perfil}</option>;
                })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="nome">Nome:</Form.Label>
            <Form.Control
              id="nome"
              value={usuarioAlterado.nome}
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="sobrenome">Sobrenome:</Form.Label>
            <Form.Control
              id="sobrenome"
              value={usuarioAlterado.sobrenome}
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
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
              value={usuarioAlterado.nomeUsuario}
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
                  nomeUsuario: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className="mb-4 ">
            <Form.Label htmlFor="emailUsuario">E-mail do Usuário:</Form.Label>
            <Form.Control
              id="emailUsuario"
              value={usuarioAlterado.email}
              onChange={(event) => {
                setUsuarioAlterado((usuarioAlterado) => ({
                  ...usuarioAlterado,
                  email: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <hr />

        <Row>
          <Col className="text-center">
            <Button
              className="mx-4"
              variant="warning"
              onClick={(event) => {
                event.preventDefault();
                setPagina((pagina) => pagina - 1);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="mx-4"
              variant="success"
              onClick={(event) => {
                event.preventDefault();
                atualizarUsuario(usuarioAlterado);
              }}
            >
              Alterar
            </Button>
          </Col>
        </Row>
        <AlertDismissible
          show={showAlert}
          setShow={setShowAlert}
          content={msgAlert}
        />
      </Container>
    </>
  );
};
