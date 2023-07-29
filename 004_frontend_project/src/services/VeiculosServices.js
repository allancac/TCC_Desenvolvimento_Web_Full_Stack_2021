import axios from 'axios';
import config from './config'

class VeiculosServices {
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

  async buscarListaVeiculos(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/veiculos/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarVeiculo(placa) {
    try {
      const response = await this.axiosInstance.get(`/veiculos/${placa}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosVeiculo(dadosVeiculo) {
    try {
      const response = await this.axiosInstance.post(`/veiculos`, dadosVeiculo);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosVeiculo(placa, dadosVeiculo) {

    try {
      const response = await this.axiosInstance.put(`/veiculos/${placa}`, dadosVeiculo);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarVeiculo(placa) {
    try {
      console.log(placa)
      const response = await this.axiosInstance.delete(`/veiculos/${placa}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default VeiculosServices;