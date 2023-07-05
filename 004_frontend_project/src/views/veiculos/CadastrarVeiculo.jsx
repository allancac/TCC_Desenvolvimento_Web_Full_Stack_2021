import { Container, Form, Col, Row, Button, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AlertDismissible from '../../components/Alerts/Alerts';
import VeiculosServices from '../../services/VeiculosServices';

export const CadastrarVeiculo = () => {
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  //   Hook para controlar/armazenar dados fornecidos pelos inputs referentes ao novo Veículo
  const [novoVeiculo, setNovoVeiculo] = useState({
    placa: '',
    id_cliente: '',
    marca: '',
    modelo: '',
    altura_cacamba: '',
    largura_cacamba: '',
    comprimento_cacamba: '',
  });

  // Função responsável por cadastrar um novo Veículo
  const finalizarCadastro = async () => {
    //  Instanciação das classes de serviço Cliente e Endereço.
    const veiculosServices = new VeiculosServices();

    try {
      // Enviar dados do cliente
      const veiculoCadastrado = await veiculosServices.enviarDadosVeiculo(
        novoVeiculo
      );

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = veiculoCadastrado.data[0];
        return {
          variant: 'success',
          heading: 'Veículo Cadastrado',
          textArray: [`O veículo "${data.placa}" foi cadastrado.`],
        };
      });
      setShowAlert(true);

      // Limpar os campos do formulário após o cadastro
      setNovoVeiculo({});
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar o veículo',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  useEffect(() => {}, [novoVeiculo]);
  return (
    <Form>
      <h1>Cadastrar Veículo</h1>
      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='id_cliente'>ID do Cliente:</Form.Label>
            <Form.Control
              id='id_cliente'
              placeholder='ID do cliente'
              value={novoVeiculo.id_cliente || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  id_cliente: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='placa'>Placa:</Form.Label>
            <Form.Control
              id='placa'
              placeholder='Placa do Veículo'
              required
              value={novoVeiculo.placa || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  placa: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='marca'>Marca:</Form.Label>
            <Form.Control
              id='marca'
              placeholder='Marca do Veículo'
              value={novoVeiculo.marca || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  marca: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='modelo'>Modelo:</Form.Label>
            <Form.Control
              id='modelo'
              placeholder='Modelo do Veículo'
              value={novoVeiculo.modelo || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  modelo: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <hr />

        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='altura_cacamba'>
              Altura da Caçamba&#40;m&#41;:
            </Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='altura_cacamba'
              placeholder='Altura em metros (0.80)'
              value={novoVeiculo.altura_cacamba || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  altura_cacamba: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='largura_cacamba'>
              Largura da Caçamba &#40;m&#41;:
            </Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='largura_cacamba'
              placeholder='Largura em metros (2.80)'
              value={novoVeiculo.largura_cacamba || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  largura_cacamba: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='comprimento_cacamba'>
              Comprimento da Caçamba &#40;m&#41;:
            </Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='comprimento_cacamba'
              placeholder='Comprimento em metros (4.00)'
              value={novoVeiculo.comprimento_cacamba || ''}
              onChange={(event) => {
                setNovoVeiculo((novoVeiculo) => ({
                  ...novoVeiculo,
                  comprimento_cacamba: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className='mb-4 '>
            <Form.Label htmlFor='capacidade'>
              Capacidade de Carga &#40;m<sup>3</sup> &#41; :
            </Form.Label>
            <Form.Control
              className='text-center'
              style={{ color: 'green', fontWeight: 'bolder' }}
              id='capacidade'
              type='text'
              readOnly
              disabled
              value={Math.max(0,

              
                (
                  novoVeiculo.largura_cacamba *
                  novoVeiculo.altura_cacamba *
                  novoVeiculo.comprimento_cacamba
                )).toFixed(2) + ' m³'
              }
              onChange={(event) => {
                event.preventDefault();
              }}
            />
          </Form.Group>
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
