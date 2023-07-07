import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EstoquesServices from '../../../services/EstoqueServices';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const AlterarEstoque = ({ estoque, setPagina }) => {
  const { idEstoque } = useParams();

  const [estoqueAlterado, setEstoqueAlterado] = useState(estoque);

  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  const atualizarEstoque = async (estoqueAlterado) => {
    //  Instanciação das classes de serviço Estoque e Endereço.
    const estoqueService = new EstoquesServices();

    try {
      // Enviar dados do estoque
      const resultado = await estoqueService.atualizarDadosEstoque(idEstoque, {
        id_produto: estoqueAlterado.id_produto,
        localizacao: estoqueAlterado.localizacao,
        tipo_estoque: estoqueAlterado.tipo_estoque,
        volume: estoqueAlterado.volume,
        capacidade_maxima: estoqueAlterado.capacidade_maxima,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: 'success',
          heading: 'Estoque Alterado',
          textArray: [`O estoque "${data.id_produto}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar estoque',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  return (
    <Container>
      <h2>Alterar dados do estoque {estoque.id}</h2>
      <hr />
      <Row>
        <Form.Group as={Col} md={3} className='mb-4 '>
          <Form.Label htmlFor='id_produto'>ID do Produto:</Form.Label>
          <Form.Control
            required
            type='number'
            step='1'
            id='id_produto'
            placeholder='ID do Produto Armazenado'
            value={estoqueAlterado.id_produto || ''}
            onChange={(event) => {
              setEstoqueAlterado((estoque) => ({
                ...estoqueAlterado,
                id_produto: event.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={3} className='mb-4 '>
          <Form.Label htmlFor='localizacao'>Localização:</Form.Label>
          <Form.Control
            required
            id='localizacao'
            placeholder='Local do Produto Armazenado'
            value={estoqueAlterado.localizacao || ''}
            onChange={(event) => {
              setEstoqueAlterado((estoque) => ({
                ...estoqueAlterado,
                localizacao: event.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={3} className='mb-4 '>
          <Form.Label htmlFor='localizacao'>Tipo de Estoque:</Form.Label>
          <Form.Select
            id='localizacao'
            value={estoqueAlterado.tipo_estoque || ''}
            onChange={(event) => {
              setEstoqueAlterado((estoque) => ({
                ...estoqueAlterado,
                tipo_estoque: event.target.value,
              }));
            }}
          >
            <option readonly>---Escolha um tipo--</option>
            <option value={'silo'}>Silo</option>
            <option value={'pilha'}>Pilha</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md={6} className='mb-4 '>
          <Form.Label htmlFor='volume'>
            Volume Atual &#40;m<sup>3</sup> &#41;:
          </Form.Label>
          <Form.Control
            required
            type='number'
            step='1'
            id='volume'
            placeholder='Volume Atual'
            value={estoqueAlterado.volume || ''}
            onChange={(event) => {
              setEstoqueAlterado((estoque) => ({
                ...estoqueAlterado,
                volume: event.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md={6} className='mb-4 '>
          <Form.Label htmlFor='volume'>
            Capacidade Máxima &#40;m<sup>3</sup> &#41;:
          </Form.Label>
          <Form.Control
            required
            type='number'
            step='1'
            id='volume'
            placeholder='Capacidade Máxima'
            value={estoqueAlterado.capacidade_maxima || ''}
            onChange={(event) => {
              setEstoqueAlterado((estoque) => ({
                ...estoqueAlterado,
                capacidade_maxima: event.target.value,
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
              atualizarEstoque(estoqueAlterado);
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
  );
};
