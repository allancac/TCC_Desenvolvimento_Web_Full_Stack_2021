import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ListaEnderecosCliente } from './ListaEnderecosCliente';
import ClientesServices from '../../services/ClientesServices';
import EndereçosServices from '../../services/EnderecosServices';
import AlertDismissible from '../../components/Alerts/Alerts';

export const CadastrarCliente = () => {
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
  const [cliente, setCliente] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
  });
  //   Hook para controlar/armazenar dados fornecidos pelos inputs referentes a um novo endereço
  const [novoEndereco, setNovoEndereco] = useState({
    id_cliente: '',
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
    tipo: '',
  });
  //   Hook para controlar/armazenar a lista de endereços que serão cadastrados
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {}, [cliente, enderecos]);

  /************************************************
   * Funções do componente
   ***********************************************/
  //  Função para remover um endereço da lista de endereços
  const removerEndereco = (endereco) => {
    setEnderecos((enderecos) => {
      const novaListaEnderecos = enderecos.filter((end) => end !== endereco);
      return novaListaEnderecos;
    });
  };

  //  Função para adicionar o ID do cliente cadastrado antes de cadastrar um endereço.
  const incluirIDClienteCadastrado = (idClienteCadastrado) => {
    const enderecosAlterados = enderecos.map((endereco) => ({
      ...endereco,
      id_cliente: idClienteCadastrado,
    }));
    return enderecosAlterados;
  };

  // Função responsável por cadastrar o Cliente e os endereços.
  const finalizarCadastro = async () => {
    //  Instanciação das classes de serviço Cliente e Endereço.
    const clienteService = new ClientesServices();
    const endereçosServices = new EndereçosServices();

    try {
      // Enviar dados do cliente
      const clienteCadastrado = await clienteService.enviarDadosCliente(
        cliente
      );

      // Atualizar o ID do cliente nos endereços
      const idClienteCadastrado = clienteCadastrado.data[0].id;
      const enderecosAlterados =
        incluirIDClienteCadastrado(idClienteCadastrado);

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = clienteCadastrado.data[0];
        return {
          variant: 'success',
          heading: 'Cliente Cadastrado',
          textArray: [
            `O cliente "${data.nome}" foi cadastrado.`,
            `ID do Cliente: ${idClienteCadastrado}`,
          ],
        };
      });
      setShowAlert(true);

      // Enviar dados dos endereços. Cria um Array de Promises com todas as tentativas de cadastro dos endereços.
      await Promise.all(
        enderecosAlterados.map(async (endereco) => {
          await endereçosServices.enviarDadosEndereco(endereco);
        })
      );

      // Limpar os campos do formulário após o cadastro
      setCliente({});
      setNovoEndereco({});
      setEnderecos([]);
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
    <Form>
      <h1>Cadastrar Cliente</h1>

      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nomeCliente'>Nome do Cliente:</Form.Label>
            <Form.Control
              id='nomeCliente'
              placeholder='Nome do cliente'
              value={cliente.nome || ''}
              onChange={(event) => {
                setCliente((cliente) => ({
                  ...cliente,
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
              value={cliente.cnpj || ''}
              onChange={(event) => {
                setCliente((cliente) => ({
                  ...cliente,
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
              value={cliente.email || ''}
              onChange={(event) => {
                setCliente((cliente) => ({
                  ...cliente,
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
              value={cliente.telefone || ''}
              onChange={(event) => {
                setCliente((cliente) => ({
                  ...cliente,
                  telefone: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <hr />

        <Row>
          <Col md={6}>
            <Form.Group as={Col} className='mb-4 '>
              <Form.Label htmlFor='logradouro'>Logradouro:</Form.Label>
              <Form.Control
                id='logradouro'
                placeholder='Rua, Avenida, Praça, etc'
                value={novoEndereco.logradouro || ''}
                onChange={(event) => {
                  setNovoEndereco((novoEndereco) => ({
                    ...novoEndereco,
                    logradouro: event.target.value,
                  }));
                }}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} lg={5} className='mb-4 '>
                <Form.Label htmlFor='cidade'>Cidade:</Form.Label>
                <Form.Control
                  id='cidade'
                  placeholder='Cidade'
                  value={novoEndereco.cidade || ''}
                  onChange={(event) => {
                    setNovoEndereco((novoEndereco) => ({
                      ...novoEndereco,
                      cidade: event.target.value,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} lg={3} className='mb-4 '>
                <Form.Label htmlFor='estado'>Estado:</Form.Label>
                <Form.Control
                  id='estado'
                  placeholder='Estado'
                  value={novoEndereco.estado || ''}
                  onChange={(event) => {
                    setNovoEndereco((novoEndereco) => ({
                      ...novoEndereco,
                      estado: event.target.value,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} lg={4} className='mb-4 '>
                <Form.Label htmlFor='cep'>CEP:</Form.Label>
                <Form.Control
                  id='cep'
                  placeholder='00000000'
                  value={novoEndereco.cep || ''}
                  onChange={(event) => {
                    setNovoEndereco((novoEndereco) => ({
                      ...novoEndereco,
                      cep: event.target.value,
                    }));
                  }}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} lg={6} className='mb-4 '>
                <Form.Label htmlFor='tipo'>Tipo de endereço:</Form.Label>
                <Form.Select
                  id='tipo'
                  value={novoEndereco.tipo || ''}
                  onChange={(event) => {
                    setNovoEndereco((novoEndereco) => ({
                      ...novoEndereco,
                      tipo: event.target.value,
                    }));
                  }}
                >
                  <option></option>
                  <option value={'comercial'}>Comercial</option>
                  <option value={'entrega'}>Entrega</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>

          <Col md={6} style={{ borderLeft: '2px solid lightgray' }}>
            <Row>
              <h5>Endereços adicionados:</h5>
            </Row>
            <ListaEnderecosCliente
              setEnderecos={removerEndereco}
              enderecos={enderecos}
            />
            <Row className='justify-content-md-center  mt-4'>
              <Col lg={6}>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    setEnderecos((enderecos) => [...enderecos, novoEndereco]);
                  }}
                >
                  Adicionar Endereço
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
    </Form>
  );
};
