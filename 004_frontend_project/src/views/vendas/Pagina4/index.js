import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VendasServices from '../../../services/VendasServices';
import { Button, Row, Col, Table, Container, } from 'react-bootstrap';
import { setQuantidade, setPrecoTotal, setIdUsuario } from '../../../redux/actions/vendasActions';
import AlertDismissible from '../../../components/Alerts/Alerts';

export const Pagina4 = () => {
  const venda = useSelector((state) => state.venda);
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  //  Hook para controle de exibição do alerta.
  const [showAlert, setShowAlert] = useState(false);
  //  Hook para controle do conteúdo do alerta.
  const [msgAlert, setMsgAlert] = useState({
    variant: '',
    heading: '',
    textArray: [],
  });
  const volume = venda.veiculo.altura_cacamba * venda.veiculo.largura_cacamba * venda.veiculo.comprimento_cacamba;

  const preco_total = (volume * venda.produto.preco).toFixed(2);

  const handleConfirmaVenda = async () => {
    try {
      const dadosVenda = {
        id_usuario: session.user.id,
        id_produto: venda.produto.id,
        id_estoque: venda.estoque.id,
        id_cliente: venda.cliente.id,
        id_endereco: venda.endereco.id,
        cpf_motorista: venda.motorista.cpf,
        placa: venda.veiculo.placa,
        quantidade: volume.toFixed(2),
        preco_total,
      };
      console.log(dadosVenda)
      const vendasServices = new VendasServices();
      const vendaCadastrada = await vendasServices.enviarDadosDeVenda(dadosVenda);

      //  Emitir alerta de confirmação da operação.
      setMsgAlert(() => {
        let data = vendaCadastrada.data[0];
        return {
          variant: 'success',
          heading: 'Venda Realizada',
          textArray: [
            `A venda foi realizada com sucesso`,
          ],
        };
      });
      setShowAlert(true);
    } catch (error) {
      setMsgAlert(() => {
        return {
          variant: 'danger',
          heading: 'Erro ao cadastrar a venda',
          textArray: listaErros.map((item) => item.msg),
        };
      });
      setShowAlert(true);
    }
  };

  useEffect(() => {
    dispatch(setIdUsuario(session.user.id));
    dispatch(setQuantidade(volume.toFixed(2)));
    dispatch(setPrecoTotal(preco_total));
  }, [dispatch, session.user.id, volume, preco_total]);

  return (
    <Container>

      <fieldset className='mb-5'>
        <h2 className="mb-4">Resumo da Venda:</h2>
        <hr />
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <th>Usuário:</th>
              <td>{session.user.nomeUsuario}</td>
            </tr>
            <tr>
              <th>Produto:</th>
              <td>{venda.produto.nome}</td>
            </tr>
            <tr>
              <th>Estoque:</th>
              <td>{`${venda.estoque.tipo_estoque.toUpperCase()} - ${venda.estoque.localizacao}`}</td>
            </tr>
            <tr>
              <th>Cliente:</th>
              <td>{venda.cliente.nome}</td>
            </tr>
            <tr>
              <th>Endereço de Entrega:</th>
              <td>{`${venda.endereco.logradouro}, ${venda.endereco.cidade}-${venda.endereco.estado}`}</td>
            </tr>
            <tr>
              <th>Motorista:</th>
              <td>{venda.motorista.nome}</td>
            </tr>
            <tr>
              <th>Veículo:</th>
              <td>{`Placa: ${venda.veiculo.placa} - ${venda.veiculo.marca} ${venda.veiculo.modelo}`}</td>
            </tr>
            <tr>
              <th>Quantidade:</th>
              <td>{`${volume.toFixed(2)} m³`}</td>
            </tr>
            <tr>
              <th>Preço Total:</th>
              <td>{`R$ ${preco_total}`}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="mt-2">
          <Col></Col>
          <Col>
            <Button variant="success" onClick={handleConfirmaVenda}>
              Confirmar Venda
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </fieldset>
      <hr />
      <AlertDismissible
        show={showAlert}
        setShow={setShowAlert}
        content={msgAlert}
      />
    </Container>
  );
};
