import axios from 'axios';
import config from './config';

class VendasServices {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${config.baseURL}`,
      withCredentials: true
    });
  }

  async buscarListaVendas(offset = 0, limit = 50) {
    try {
      const { data } = await this.axiosInstance.get(`/vendas/?offset=${offset}&limit=${limit}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async buscarVendasPorFiltros(id_cliente, id_produto, periodo) {
    try {
      const { data } = await this.axiosInstance.get('/vendas/filtrar', {
        params: {
          id_cliente,
          id_produto,
          periodo
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async buscarVendaPorId(id) {
    try {
      const { data } = await this.axiosInstance.get(`/vendas/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async enviarDadosDeVenda(venda) {
    try {
      const { data } = await this.axiosInstance.post('/vendas', venda);
      console.log("Resposta do servidor:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cancelarVenda(id) {
    try {
      const { data } = await this.axiosInstance.delete(`/vendas/${id}`);
      console.log("Resposta do servidor:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


export default VendasServices;
