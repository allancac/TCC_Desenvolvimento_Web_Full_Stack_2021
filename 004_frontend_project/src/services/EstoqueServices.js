import axios from 'axios';
import config from './config'

export default class EstoquesServices {
  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${config.baseURL}`, withCredentials: true });
  }

  async buscarListaEstoques(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/estoques/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarEstoque(id) {
    try {
      const response = await this.axiosInstance.get(`/estoques/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosEstoque(dadosEstoque) {
    try {
      const response = await this.axiosInstance.post(`/estoques`, dadosEstoque);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosEstoque(id, dadosEstoque) {

    try {
      const response = await this.axiosInstance.put(`/estoques/${id}`, dadosEstoque);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarEstoque(id) {
    try {
      const response = await this.axiosInstance.delete(`/estoques/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}