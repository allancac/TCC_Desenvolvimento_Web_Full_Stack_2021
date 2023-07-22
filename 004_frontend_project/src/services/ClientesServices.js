import axios from 'axios';
import config from './config'

class ClientesServices {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${config.baseURL}`,
      withCredentials: true
    });
  }

  async buscarListaClientes(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/clientes/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarCliente(id) {
    try {
      const response = await this.axiosInstance.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosCliente(dadosCliente) {
    try {
      const response = await this.axiosInstance.post(`/clientes`, dadosCliente);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosCliente(id, dadosCliente) {

    try {
      const response = await this.axiosInstance.put(`/clientes/${id}`, dadosCliente);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarCliente(id) {
    try {
      console.log(id)
      const response = await this.axiosInstance.delete(`/clientes/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default ClientesServices;