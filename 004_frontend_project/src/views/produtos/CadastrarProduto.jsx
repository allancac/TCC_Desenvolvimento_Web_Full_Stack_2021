import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProdutosServices from '../../services/ProdutosServices';
import AlertDismissible from '../../components/Alerts/Alerts';

export const CadastrarProduto = () => {
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
  const [produto, setProduto] = useState({
    nome: '',
    tipo: '',
    descricao: '',
    preco: 0,
  });

  useEffect(() => {}, [produto]);

  /************************************************
   * Funções do componente
   ***********************************************/

  // Função responsável por cadastrar o Produto
  const finalizarCadastro = async () => {
    //  Instanciação das classes de serviço Produto e Endereço.
    const produtoService = new ProdutosServices();

    try {
      // Enviar dados do produto
      const produtoCadastrado = await produtoService.enviarDadosProduto(
        produto
      );

      // Atualizar o ID do produto nos endereços
      const idProdutoCadastrado = produtoCadastrado.data[0].id;

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = produtoCadastrado.data[0];
        return {
          variant: 'success',
          heading: 'Produto Cadastrado',
          textArray: [
            `O produto "${data.nome}" foi cadastrado.`,
            `ID do Produto: ${idProdutoCadastrado}`,
          ],
        };
      });
      setShowAlert(true);

      // Limpar os campos do formulário após o cadastro
      setProduto({});
    } catch (error) {
      const listaErros = error.response.data.status.errors;
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar produto',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };
  console.log(produto);
  return (
    <Form>
      <h1>Cadastrar Produto</h1>

      <hr />
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='descricao'>Nome do Produto:</Form.Label>
            <Form.Control
              required
              id='nomeProduto'
              placeholder='Nome do produto'
              value={produto.nome || ''}
              onChange={(event) => {
                setProduto((produto) => ({
                  ...produto,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='tipoProduto'>Tipo:</Form.Label>
            <Form.Control
              id='tipoProduto'
              placeholder='Tipo do produto'
              value={produto.tipo || ''}
              onChange={(event) => {
                setProduto((produto) => ({
                  ...produto,
                  tipo: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='descricao'>Descrição do Produto:</Form.Label>
            <Form.Control
              type='text'
              id='descricao'
              placeholder='Descrição do produto'
              value={produto.descricao || ''}
              onChange={(event) => {
                setProduto((produto) => ({
                  ...produto,
                  descricao: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='preco'>Preço do Produto(R$):</Form.Label>
            <Form.Control
              required
              type='number'
              step='5.0'
              id='preco'
              placeholder='Preço do produto'
              value={produto.preco || ''}
              onChange={(event) => {
                setProduto((produto) => ({
                  ...produto,
                  preco: event.target.value,
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
