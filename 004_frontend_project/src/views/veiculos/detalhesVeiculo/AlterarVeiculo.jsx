import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import VeiculosServices from '../../../services/VeiculosServices';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const AlterarVeiculo = ({ veiculo, setPagina }) => {
  const { placa } = useParams();

  const [veiculoAlterado, setVeiculoAlterado] = useState(veiculo);
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  const atualizarVeiculo = async (veiculoAlterado) => {
    //  Instanciação das classes de serviço Veiculo
    const veiculoService = new VeiculosServices();

    try {
      // Enviar dados do veiculo
      const resultado = await veiculoService.atualizarDadosVeiculo(placa, {
        placa: veiculoAlterado.placa,
        id_cliente: veiculoAlterado.id_cliente,
        marca: veiculoAlterado.marca,
        modelo: veiculoAlterado.modelo,
        altura_cacamba: veiculoAlterado.altura_cacamba,
        largura_cacamba: veiculoAlterado.largura_cacamba,
        comprimento_cacamba: veiculoAlterado.comprimento_cacamba,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: 'success',
          heading: 'Veículo Alterado',
          textArray: [`O Veículo "${data.placa}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
      setPagina((pagina) => 0);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar Veículo',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <h2>Alterar dados do Veículo</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='idCliente'>ID do Cliente:</Form.Label>
            <Form.Control
              id='idCliente'
              placeholder='ID do cliente'
              value={veiculoAlterado.id_cliente || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
                  id_cliente: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='placa'>Placa do Veículo:</Form.Label>
            <Form.Control
              required
              id='placa'
              placeholder='Placa do Veículo'
              value={veiculoAlterado.placa || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
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
              placeholder='Marca do veículo'
              value={veiculoAlterado.marca || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
                  marca: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='modelo'>Modelo:</Form.Label>
            <Form.Control
              id='modelo'
              placeholder='Modelo do veículo'
              value={veiculoAlterado.modelo || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
                  modelo: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='altura'>Altura da caçamba:</Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='altura'
              placeholder='Altura da caçamba'
              value={veiculoAlterado.altura_cacamba || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
                  altura_cacamba: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='largura'>Largura da caçamba:</Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='largura'
              placeholder='Largura da caçamba'
              value={veiculoAlterado.largura_cacamba || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
                  largura_cacamba: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} className='mb-4 '>
            <Form.Label htmlFor='comprimento'>
              Comprimento da caçamba:
            </Form.Label>
            <Form.Control
              required
              type='number'
              step='0.01'
              id='comprimento'
              placeholder='Comprimento da caçamba'
              value={veiculoAlterado.comprimento_cacamba || ''}
              onChange={(event) => {
                setVeiculoAlterado((veiculoAlterado) => ({
                  ...veiculoAlterado,
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
              value={
                Math.max(
                  0,

                  veiculoAlterado.largura_cacamba *
                    veiculoAlterado.altura_cacamba *
                    veiculoAlterado.comprimento_cacamba
                ).toFixed(2) + ' m³'
              }
              onChange={(event) => {
                event.preventDefault();
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
                atualizarVeiculo(veiculoAlterado);
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
