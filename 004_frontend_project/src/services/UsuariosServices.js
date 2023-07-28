import axios from 'axios';
import config from './config'

class UsuariosServices {
  constructor() {
    this.axiosInstance = axios.create({ baseURL: `${config.baseURL}`, withCredentials: true });
  }

  async buscarListaUsuarios(offset = 0, limit = 20) {
    try {
      const response = await this.axiosInstance.get(`/usuarios/?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarUsuario(cpf) {
    try {
      const response = await this.axiosInstance.get(`/usuarios/${cpf}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async enviarDadosUsuario(dadosUsuario) {
    try {
      const response = await this.axiosInstance.post(`/usuarios`, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async atualizarDadosUsuario(cpf, dadosUsuario) {

    try {
      const response = await this.axiosInstance.put(`/usuarios/${cpf}`, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletarUsuario(cpf) {
    try {
      console.log(cpf)
      const response = await this.axiosInstance.delete(`/usuarios/${cpf}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default UsuariosServices;