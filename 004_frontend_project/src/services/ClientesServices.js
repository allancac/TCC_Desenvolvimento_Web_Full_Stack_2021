import axios from 'axios';
const serverName = 'virtserver.swaggerhub.com/'
const path = 'allancac/vendas_emasa/1.0.0'

class ClientesServices {
  constructor() {
    this.serverName = serverName;
    this.axiosInstance = axios.create({
      baseURL: `https://${this.serverName}${path}`
    });
  }

  async enviarDadosCliente(cliente) {
    try {
      const response = await this.axiosInstance.post('/clientes', cliente);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async buscarListaClientes() {
    try {
      const response = await this.axiosInstance.get('/clientes/?bodyLimit=20&pagelimit=10');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}

export default ClientesServices;