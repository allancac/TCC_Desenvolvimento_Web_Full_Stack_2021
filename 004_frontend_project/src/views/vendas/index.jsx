import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import VendasServices from '../../services/VendasServices';
// import ClientesServices from '../../services/ClientesServices';
import { Pagina1 } from './Pagina1';
import { Pagina2 } from './Pagina2';
import { Pagina3 } from './Pagina3';

export const Vendas = () => {
  // Hook para controle das páginas de formulários
  const [pagina, setPagina] = useState(1);

  // Hook e função para controle e envio do objeto Vendas
  const dadosVenda = {
    id: 0,
    data_venda: '',
    id_produto: 0,
    id_estoque: 0,
    id_cliente: 0,
    id_endereco: 0,
    id_motorista: 0,
    id_veiculo: '',
    quantidade: 0,
    preco_total: 0,
    nome_cliente: '',
    endereco: '',
    motorista: '',
  };

  const [venda] = useState(dadosVenda);

  // async function enviarVenda() {
  //   const vendasServices = new VendasServices();
  //   try {
  //     const dadosDaVenda = await vendasServices.enviarDadosDeVenda(venda);
  //     console.log(dadosDaVenda);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // Hook e função para controle e retorno do objeto com a lista Clientes procurados
  const listaClientes = {
    data: [
      {
        id: 20220001,
        nome: 'Loja de Construção do Recreio Ltda.',
        telefone: '(11)9999-9999',
        email: 'Recreio@dominio.com.br',
        cnpj: '11222333/0001-00',
        data_registro: '2016-08-29T09:12:33.001Z',
        endereco: 'Avenida das Américas, 13023',
      },
      {
        id: 20220002,
        nome: 'Loja de Construção de Copacabana Ltda.',
        telefone: '(11)99-9999',
        email: 'copacabana@dominio.com.br',
        cnpj: '11222444/0001-00',
        data_registro: '2011-10-01T09:12:25.001Z',
        endereco: 'Rua Barata Ribeiro, 1500',
      },
      {
        id: 20220003,
        nome: 'Loja de Construção Botafogo Ltda.',
        telefone: '(11)9999-9912',
        email: 'loja.botafogo@dominio.com.br',
        cnpj: '11332333/0001-00',
        data_registro: '2021-03-09T09:10:39.001Z',
        endereco: 'Rua Voluntários da Pátria, 1000',
      },
      {
        id: 20220004,
        nome: 'Loja de Construção do Catete Ltda.',
        telefone: '(11)9999-3699',
        email: 'catete.vendas@dominio.com.br',
        cnpj: '11224736/0001-00',
        data_registro: '2018-03-20T09:12:33.001Z',
        endereco: 'Rua do Catete, 123',
      },
    ],
    links: {
      self: 'http://server:3000/clientes?page=1',
      next: 'http://server:3000/clientes?page=2',
      prev: 'http://server:3000/clientes?page=1',
      first: 'http://server:3000/clientes?page=1',
      last: 'http://server:3000/clientes?page=3',
    },
    meta: {
      total_items: 10,
      items_per_page: 5,
      current_page: 1,
      total_pages: 2,
      has_next_page: true,
      has_prev_page: false,
    },
    cache: {
      max_age: 3600,
      etag: 'abc123',
    },
  };

  const [clientes, setClientes] = useState(listaClientes);
  async function buscarClientes() {
    const listaClientes = new ClientesServices();
    try {
      const resultado = await listaClientes.buscarListaClientes;
    } catch (error) {
      console.log(error);
    }
    return resultado;
  }

  // MOCK dos dados dos clientes, veículos, produtos e estoques

  const listaVeiculos = [
    [
      {
        placa: 'MMV4455',
        id_cliente: 20220001,
        marca: 'FORD',
        modelo: 'Cargo 2428',
        altura_cacamba: 0.8,
        largura_cacamba: 3.2,
        comprimento_cacamba: 4.5,
      },
      {
        placa: 'MMV8877',
        id_cliente: 20220001,
        marca: 'Mercedes Benz',
        modelo: 'Axor 2544',
        altura_cacamba: 1,
        largura_cacamba: 3.5,
        comprimento_cacamba: 5,
      },
      {
        placa: 'KML1122',
        id_cliente: 20220003,
        marca: 'Mercedes Benz',
        modelo: 'Axor 2544',
        altura_cacamba: 1.2,
        largura_cacamba: 3.5,
        comprimento_cacamba: 4.8,
      },
    ],
  ];

  const listaEstoques = [
    {
      id: 1,
      capacidade_maxima: 1800,
      data_atualizacao_estoque: '2016-08-29T09:12:33.001Z',
      localizacao: 'Pátio superior',
      volume: 1500,
      tipo: 'Pilha',
      produto: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome do produto',
            example: 'Pedra 1',
          },
          tipo: {
            type: 'string',
            description: 'Tipo do produto',
            example: 'Brita',
          },
          descricao: {
            type: 'string',
            description: 'Descrição do produto',
            example: 'Pedra com diâmetro médio de 25mm',
          },
          preco: {
            type: 'number',
            format: 'float',
            description: 'Preço do produto',
            example: 65,
          },
        },
      },
    },
    {
      id: 2,
      capacidade_maxima: 1000,
      data_atualizacao_estoque: '2016-08-28T09:12:40.001Z',
      localizacao: 'Pátio principal',
      volume: 1500,
      tipo: 'Pilha',
      produto: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome do produto',
            example: 'Pedra 2',
          },
          tipo: {
            type: 'string',
            description: 'Tipo do produto',
            example: 'Brita',
          },
          descricao: {
            type: 'string',
            description: 'Descrição do produto',
            example: 'Pedra com diâmetro médio de 35mm',
          },
          preco: {
            type: 'number',
            format: 'float',
            description: 'Preço do produto',
            example: 60,
          },
        },
      },
    },
  ];

  return (
    <>
      <Form>
        {pagina === 1 && <Pagina1 />}
        {pagina === 2 && <Pagina2 />}
        {pagina === 3 && <Pagina3 />}
      </Form>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={{ span: 6, offset: 3 }}>
            <ButtonGroup aria-label='Basic example'>
              {pagina > 1 && pagina <= 3 && (
                <Button
                  className='mx-1'
                  variant='danger'
                  onClick={(e) => {
                    setPagina((s) => s - 1);
                  }}
                >
                  &lt; Retornar
                </Button>
              )}

              {pagina <= 3 && (
                <Button
                  className='mx-1'
                  variant='success'
                  onClick={(e) => {
                    setPagina((s) => s + 1);
                  }}
                >
                  Continuar &gt;
                </Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
