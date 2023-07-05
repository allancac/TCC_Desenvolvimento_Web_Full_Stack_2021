import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MotoristasServices from '../../services/MotoristasServices';
import AlertDismissible from '../../components/Alerts/Alerts';

export const CadastrarMotoristas = () => {
  /************************************************
   * HOOKS de controle do componente
   ***********************************************/
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  //   Hook para controlar/armazenar dados fornecidos pelos inputs referentes ao usuário
  const [novoMotorista, setNovoMotorista] = useState({
    cpf: '',
    placa: '',
    nome: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {}, [novoMotorista]);

  /************************************************
   * Funções do componente
   ***********************************************/
  // Função responsável por cadastrar o Motorista e os endereços.
  const finalizarCadastro = async () => {
    //  Instanciação das classes de serviço Motorista e Endereço.
    const motoristaService = new MotoristasServices();

    try {
      // Enviar dados do motorista
      const motoristaCadastrado = await motoristaService.enviarDadosMotorista(
        novoMotorista
      );

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = motoristaCadastrado.data[0];
        return {
          variant: 'success',
          heading: 'Motorista Cadastrado',
          textArray: [
            `O motorista "${data.nome}" foi cadastrado.`,
            `Veículo do Motorista: ${data.placa}`,
          ],
        };
      });
      setShowAlert(true);

      // Limpar os campos do formulário após o cadastro
      setNovoMotorista({});
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar motorista',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <h1>Cadastrar Motorista</h1>
      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='cpf'>CPF:</Form.Label>
            <Form.Control
              id='cpf'
              placeholder='CPF do Motorista'
              value={novoMotorista.cpf || ''}
              onChange={(event) => {
                setNovoMotorista((motorista) => ({
                  ...motorista,
                  cpf: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='placa'>Placa:</Form.Label>
            <Form.Control
              required
              id='placa'
              placeholder='Placa do Veículo'
              value={novoMotorista.placa || ''}
              onChange={(event) => {
                setNovoMotorista((motorista) => ({
                  ...motorista,
                  placa: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nome'>Nome:</Form.Label>
            <Form.Control
              required
              id='nome'
              placeholder='Nome do motorista'
              value={novoMotorista.nome || ''}
              onChange={(event) => {
                setNovoMotorista((motorista) => ({
                  ...motorista,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='telefone'>Telefone:</Form.Label>
            <Form.Control
              id='telefone'
              placeholder='Telefone de contato'
              value={novoMotorista.telefone || ''}
              onChange={(event) => {
                setNovoMotorista((motorista) => ({
                  ...motorista,
                  telefone: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='email'>E-mail:</Form.Label>
            <Form.Control
              id='email'
              placeholder='E-mail de contato'
              value={novoMotorista.email || ''}
              onChange={(event) => {
                setNovoMotorista((motorista) => ({
                  ...motorista,
                  email: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <hr />
        <Container>
        <AlertDismissible
          show={showAlert}
          setShow={setShowAlert}
          content={msgAlert}
        />
        <Row className='justify-content-md-center  mt-4'>
          <Col md={{ span: 6, offset: 3 }}>
            <Button variant='success' onClick={finalizarCadastro}>
              Finalizar Cadastro
            </Button>
          </Col>
        </Row>
      </Container>
      </Container>
    </>
  );
};
