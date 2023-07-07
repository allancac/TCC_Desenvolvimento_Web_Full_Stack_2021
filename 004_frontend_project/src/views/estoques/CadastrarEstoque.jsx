import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EstoquesServices from '../../services/EstoqueServices';
import AlertDismissible from '../../components/Alerts/Alerts';

export const CadastrarEstoque = () => {
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
  const [estoque, setEstoque] = useState({
    id_produto: 0,
    localizacao: '',
    tipo_estoque: '',
    volume: 0,
    capacidade_maxima: 0,
  });

  useEffect(() => {}, [estoque]);

  /************************************************
   * Funções do componente
   ***********************************************/

  // Função responsável por cadastrar o Estoque
  const finalizarCadastro = async () => {
    //  Instanciação das classes de serviço Estoque e Endereço.
    const estoqueService = new EstoquesServices();

    try {
      // Enviar dados do estoque
      const estoqueCadastrado = await estoqueService.enviarDadosEstoque(
        estoque
      );

      // Atualizar o ID do estoque nos endereços
      const idEstoqueCadastrado = estoqueCadastrado.data[0].id;

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = estoqueCadastrado.data[0];
        return {
          variant: 'success',
          heading: 'Estoque Cadastrado',
          textArray: [
            `O estoque "${data.nome}" foi cadastrado.`,
            `ID do Estoque: ${idEstoqueCadastrado}`,
          ],
        };
      });
      setShowAlert(true);

      // Limpar os campos do formulário após o cadastro
      setEstoque({});
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
  console.log(estoque);
  return (
    <Form>
      <h1>Cadastrar Estoque</h1>

      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='id_produto'>ID do Produto:</Form.Label>
            <Form.Control
              required
              type='number'
              step='1'
              id='id_produto'
              placeholder='ID do Produto Armazenado'
              value={estoque.id_produto || ''}
              onChange={(event) => {
                setEstoque((estoque) => ({
                  ...estoque,
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
              value={estoque.localizacao || ''}
              onChange={(event) => {
                setEstoque((estoque) => ({
                  ...estoque,
                  localizacao: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={3} className='mb-4 '>
            <Form.Label htmlFor='localizacao'>Tipo de Estoque:</Form.Label>
            <Form.Select
              id='localizacao'
              value={estoque.tipo_estoque || ''}
              onChange={(event) => {
                setEstoque((estoque) => ({
                  ...estoque,
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
              value={estoque.volume || ''}
              onChange={(event) => {
                setEstoque((estoque) => ({
                  ...estoque,
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
              value={estoque.capacidade_maxima || ''}
              onChange={(event) => {
                setEstoque((estoque) => ({
                  ...estoque,
                  capacidade_maxima: event.target.value,
                }));
              }}
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
