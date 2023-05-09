import axios from 'axios';

class ClientesServices {
  serverName = 'https://virtserver.swaggerhub.com/allancac/vendas_emasa/1.0.0'
  constructor() {
    this.serverName = serverName;
    this.axiosInstance = axios.create({
      baseURL: `https://${serverName}`
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
      const response = await this.axiosInstance.get('/clientes');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ClientesServices;