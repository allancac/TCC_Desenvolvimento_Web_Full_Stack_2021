import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientesServices from '../../../services/ClientesServices';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const AlterarCliente = ({ cliente, setPagina }) => {
  const { idCliente } = useParams();

  const [clienteAlterado, setClienteAlterado] = useState(cliente);

  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  const atualizarCliente = async (clienteAlterado) => {
    //  Instanciação das classes de serviço Cliente e Endereço.
    const clienteService = new ClientesServices();

    try {
      // Enviar dados do cliente
      const resultado = await clienteService.atualizarDadosCliente(idCliente, {
        nome: clienteAlterado.nome,
        cnpj: clienteAlterado.cnpj,
        email: clienteAlterado.email,
        telefone: clienteAlterado.telefone,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: 'success',
          heading: 'Cliente Alterado',
          textArray: [`O cliente "${data.nome}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
      setPagina((pagina) => 0);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar cliente',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };
  return (
    <>
      <h2>Alterar dados do cliente</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nomeCliente'>Nome do Cliente:</Form.Label>
            <Form.Control
              id='nomeCliente'
              placeholder='Nome do cliente'
              value={clienteAlterado.nome || ''}
              onChange={(event) => {
                setClienteAlterado((clienteAlterado) => ({
                  ...clienteAlterado,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='cnpjCliente'>CNPJ:</Form.Label>
            <Form.Control
              id='cnpjCliente'
              placeholder='CNPJ do cliente'
              value={clienteAlterado.cnpj || ''}
              onChange={(event) => {
                setClienteAlterado((clienteAlterado) => ({
                  ...clienteAlterado,
                  cnpj: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='emailCliente'>E-mail:</Form.Label>
            <Form.Control
              id='emailCliente'
              placeholder='E-mail do cliente'
              value={clienteAlterado.email || ''}
              onChange={(event) => {
                setClienteAlterado((clienteAlterado) => ({
                  ...clienteAlterado,
                  email: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='telefoneCliente'>Telefone:</Form.Label>
            <Form.Control
              id='telefoneCliente'
              placeholder='Telefone do cliente'
              value={clienteAlterado.telefone || ''}
              onChange={(event) => {
                setClienteAlterado((clienteAlterado) => ({
                  ...clienteAlterado,
                  telefone: event.target.value,
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
                atualizarCliente(clienteAlterado);
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
