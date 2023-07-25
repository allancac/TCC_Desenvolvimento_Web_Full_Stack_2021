import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { OffCanvasClientes } from "./OffCanvas";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndereco,
  setVeiculo,
  setMotorista,
} from "../../../redux/actions/vendasActions";
import VeiculosServices from "../../../services/VeiculosServices";

export const Pagina1 = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const [motoristas, setMotoristas] = useState([]);

  const clienteSelecionado = useSelector((state) => state.venda.cliente);
  const veiculoSelecionado = useSelector((state) => state.venda.veiculo);

  const selecionarEndereco = (event) => {
    let idEndereco = event.target.value;
    let endereco = clienteSelecionado.enderecos.find(
      (ende) => ende.id == idEndereco
    );
    dispatch(setEndereco(endereco));
  };

  const selecionarVeiculo = (event) => {
    let placa = event.target.value;
    let veiculo = clienteSelecionado.veiculos.find(
      (veic) => veic.placa == placa
    );
    dispatch(setVeiculo(veiculo));
  };

  const selecionarMotorista = (event) => {
    let cpf = event.target.value;
    console.log(cpf);
    let motoristaSelecionado = motoristas.find(
      (motorista) => motorista.cpf === cpf
    );
    dispatch(setMotorista(motoristaSelecionado));
  };

  const buscarMotoristas = async () => {
    if (veiculoSelecionado) {
      const { placa } = veiculoSelecionado;
      const veiculosServices = new VeiculosServices();
      const { data } = await veiculosServices.buscarVeiculo(placa);
      setMotoristas(data[0].motoristas);
    }
  };

  useEffect(() => {
    buscarMotoristas();
  }, [veiculoSelecionado]);

  const [buscaCliente, setBuscaCliente] = useState("");

  return (
    <fieldset style={{ minHeight: "450px" }}>
      <h1>Cadastrar Venda</h1>
      <hr />
      <h2>Dados do Cliente e do Veículo</h2>
      <Form.Group className="mb-3 ">
        <Container>
          <Row>
            <Form.Label htmlFor="buscaCliente">Procurar Cliente</Form.Label>
            <Col md={8} sm={12}>
              <Form.Control
                id="buscaCliente"
                placeholder="Nome ou ID do cliente"
                onChange={(event) => setBuscaCliente(event.target.value)}
              />
            </Col>
            <Col md={4} sm={12}>
              <Button onClick={handleShow} variant="secondary">
                Buscar Cliente
              </Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <h3>
        Cliente Selecionado:
        <span>
          {!clienteSelecionado.id ? " Nenhum" : clienteSelecionado.nome}
        </span>
      </h3>
      <Form.Group className="mb-3">
        <Container>
          <Row>
            <Col md={8}>
              <Form.Label htmlFor="buscaEnderecoEntrega">
                Endereço de Entrega
              </Form.Label>
              <Form.Select
                id="buscaEnderecoEntrega"
                onChange={selecionarEndereco}
              >
                <option value={null}>Escolha o Endereço</option>
                {clienteSelecionado.id &&
                  clienteSelecionado.enderecos.map((endereco) => (
                    <option key={endereco.id} value={endereco.id}>
                      {endereco.logradouro}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3">
        <Container>
          <Row>
            <Col md={4} sm={12}>
              <Form.Label htmlFor="buscaPlacaVeiculo">
                Escolha o Veículo
              </Form.Label>
              <Form.Select id="buscaPlacaVeiculo" onChange={selecionarVeiculo}>
                <option value={null}>Escolha o Veículo</option>
                {clienteSelecionado.id &&
                  clienteSelecionado.veiculos.map((veiculo) => (
                    <option key={veiculo.placa} value={veiculo.placa}>
                      {veiculo.placa}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col md={4} sm={12}>
              <Form.Label htmlFor="buscaMotorista">
                Escolha o Motorista
              </Form.Label>
              <Form.Select id="buscaMotorista" onChange={selecionarMotorista}>
                <option value={null}>Escolha o Motorista</option>
                {motoristas.length > 0 &&
                  motoristas.map((motorista) => (
                    <option key={motorista.cpf} value={motorista.cpf}>
                      {motorista.nome}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Form.Group>

      <OffCanvasClientes
        show={show}
        setShow={setShow}
        buscaCliente={buscaCliente}
      />
    </fieldset>
  );
};
