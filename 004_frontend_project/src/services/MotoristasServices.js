import axios from 'axios';
import config from './config'

class MotoristasServices {
  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${config.baseURL}`, withCredentials: true });
    // Verifica se o token está presente na local storage
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.setToken(this.token);
    }
  }
  setToken(token) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }


  async buscarListaMotoristas(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/motoristas/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarMotorista(cpf) {
    try {
      const response = await this.axiosInstance.get(`/motoristas/${cpf}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosMotorista(dadosMotorista) {
    try {
      const response = await this.axiosInstance.post(`/motoristas`, dadosMotorista);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosMotorista(cpf, dadosMotorista) {

    try {
      const response = await this.axiosInstance.put(`/motoristas/${cpf}`, dadosMotorista);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarMotorista(cpf) {
    try {
      console.log(cpf)
      const response = await this.axiosInstance.delete(`/motoristas/${cpf}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default MotoristasServices;