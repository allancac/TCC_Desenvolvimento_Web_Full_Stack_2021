import axios from 'axios';
import config from './config'

export default class ProdutosServices {
  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${config.baseURL}`, withCredentials: true });
  }

  async buscarListaProdutos(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/produtos/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarProduto(id) {
    try {
      const response = await this.axiosInstance.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosProduto(dadosProduto) {
    try {
      const response = await this.axiosInstance.post(`/produtos`, dadosProduto);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosProduto(id, dadosProduto) {

    try {
      const response = await this.axiosInstance.put(`/produtos/${id}`, dadosProduto);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarProduto(id) {
    try {
      const response = await this.axiosInstance.delete(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}