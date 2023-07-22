import axios from 'axios';
import config from './config'

class EnderecosServices {
  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${config.baseURL}`, withCredentials: true });
  }

  async buscarListaEnderecos(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/enderecos/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarListaEndereco(id) {
    try {
      const response = await this.axiosInstance.get(`/enderecos/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosEndereco(dadosEndereco) {
    try {
      const response = await this.axiosInstance.post(`/enderecos`, dadosEndereco);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosEndereco(id, dadosEndereco) {

    try {
      const response = await this.axiosInstance.put(`/enderecos/${id}`, dadosEndereco);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarEndereco(id) {
    try {
      const response = await this.axiosInstance.delete(`/enderecos/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default EnderecosServices;