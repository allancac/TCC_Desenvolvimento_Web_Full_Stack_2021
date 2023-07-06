import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProdutosServices from '../../../services/ProdutosServices';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const AlterarProduto = ({ produto, setPagina }) => {
  const { idProduto } = useParams();

  const [produtoAlterado, setProdutoAlterado] = useState(produto);

  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });

  const atualizarProduto = async (produtoAlterado) => {
    //  Instanciação das classes de serviço Produto e Endereço.
    const produtoService = new ProdutosServices();

    try {
      // Enviar dados do produto
      const resultado = await produtoService.atualizarDadosProduto(idProduto, {
        nome: produtoAlterado.nome,
        cnpj: produtoAlterado.cnpj,
        email: produtoAlterado.email,
        preco: produtoAlterado.preco,
      });

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = resultado.data[0];
        return {
          variant: 'success',
          heading: 'Produto Alterado',
          textArray: [`O produto "${data.nome}" foi alterado com sucesso.`],
        };
      });
      setShowAlert(true);
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

  return (
    <>
      <h2>Alterar dados do produto</h2>
      <Container>
        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='nome'>Nome do Produto:</Form.Label>
            <Form.Control
              required
              id='nome'
              placeholder='Nome do produto'
              value={produtoAlterado.nome || ''}
              onChange={(event) => {
                setProdutoAlterado((produtoAlterado) => ({
                  ...produtoAlterado,
                  nome: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='tipo'>Tipo do Produto:</Form.Label>
            <Form.Control
              id='tipo'
              placeholder='CNPJ do produto'
              value={produtoAlterado.tipo || ''}
              onChange={(event) => {
                setProdutoAlterado((produtoAlterado) => ({
                  ...produtoAlterado,
                  tipo: event.target.value,
                }));
              }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='descricao'>Descrição de Produto:</Form.Label>
            <Form.Control
              id='descricao'
              placeholder='Descrição do produto'
              value={produtoAlterado.descricao || ''}
              onChange={(event) => {
                setProdutoAlterado((produtoAlterado) => ({
                  ...produtoAlterado,
                  descricao: event.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md={6} className='mb-4 '>
            <Form.Label htmlFor='preco'>Preço do Produto:</Form.Label>
            <Form.Control
              id='preco'
              placeholder='Preço do produto'
              value={produtoAlterado.preco || ''}
              onChange={(event) => {
                setProdutoAlterado((produtoAlterado) => ({
                  ...produtoAlterado,
                  preco: event.target.value,
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
                setPagina((pagina) => 0);
              }}
            >
              Cancelar
            </Button>
            <Button
              className='mx-4'
              variant='success'
              onClick={(event) => {
                event.preventDefault();
                atualizarProduto(produtoAlterado);
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
