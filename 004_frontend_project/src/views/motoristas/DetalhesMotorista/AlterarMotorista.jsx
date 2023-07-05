import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MotoristasServices from '../../../services/MotoristasServices';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const AlterarMotorista = ({ motorista, setPagina }) => {
  const { cpf } = useParams();

  const [motoristaAlterado, setMotoristaAlterado] = useState(motorista);

  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  const atualizarMotorista = async (motoristaAlterado) => {
    //  Instanciação das classes de serviço Motorista e Endereço.
    const motoristaService = new MotoristasServices();

    try {
      // Enviar dados do motorista
      const resultado = await motoristaService.atualizarDadosMotorista(cpf, {
        placa: motoristaAlterado.placa,
        cpf: motoristaAlterado.cpf,
        nome: motoristaAlterado.nome,
        email: motoristaAlterado.email,
        telefone: motoristaAlterado.telefone,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: 'success',
          heading: 'Motorista Alterado',
          textArray: [`O motorista "${data.nome}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
      
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
      <h2>Alterar dados do motorista</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='cpf'>CPF do Motorista:</Form.Label>
            <Form.Control
              id='cpf'
              placeholder='CPF do motorista'
              value={motoristaAlterado.cpf || ''}
              onChange={(event) => {
                setMotoristaAlterado((motoristaAlterado) => ({
                  ...motoristaAlterado,
                  cpf: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='cpf'>Placa do Veículo:</Form.Label>
            <Form.Control
              id='placa'
              placeholder='Placa do Veículo'
              value={motoristaAlterado.placa || ''}
              onChange={(event) => {
                setMotoristaAlterado((motoristaAlterado) => ({
                  ...motoristaAlterado,
                  placa: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nomeMotorista'>Nome do Motorista:</Form.Label>
            <Form.Control
              id='nomeMotorista'
              placeholder='Nome do motorista'
              value={motoristaAlterado.nome || ''}
              onChange={(event) => {
                setMotoristaAlterado((motoristaAlterado) => ({
                  ...motoristaAlterado,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='telefoneMotorista'>
              Telefone do Motorista:
            </Form.Label>
            <Form.Control
              id='telefoneMotorista'
              placeholder='Telefone do motorista'
              value={motoristaAlterado.telefone || ''}
              onChange={(event) => {
                setMotoristaAlterado((motoristaAlterado) => ({
                  ...motoristaAlterado,
                  telefone: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='emailMotorista'>
              E-mail do Motorista:
            </Form.Label>
            <Form.Control
              id='emailMotorista'
              placeholder='E-mail do motorista'
              value={motoristaAlterado.email || ''}
              onChange={(event) => {
                setMotoristaAlterado((motoristaAlterado) => ({
                  ...motoristaAlterado,
                  email: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <hr />
        <Row>
          <Col className='text-center'>
            <Button
              className='mx-4'
              variant='warning'
              onClick={(event) => {
                event.preventDefault();
                setPagina((pagina) => pagina - 1);
              }}
            >
              Cancelar
            </Button>
            <Button
              className='mx-4'
              variant='success'
              onClick={(event) => {
                event.preventDefault();
                atualizarMotorista(motoristaAlterado);
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
