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

  async buscarUsuario(id) {
    try {
      const response = await this.axiosInstance.get(`/usuarios/${id}`);
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


  async atualizarDadosUsuario(id, dadosUsuario) {
    try {
      const response = await this.axiosInstance.put(`/usuarios/${id}`, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default UsuariosServices;