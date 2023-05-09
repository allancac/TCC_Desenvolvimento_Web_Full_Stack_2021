import axios from 'axios';
const serverName = 'virtserver.swaggerhub.com/'
const path = 'allancac/vendas_emasa/1.0.0'

class EstoqueServices {
  constructor() {
    this.serverName = serverName;
    this.axiosInstance = axios.create({
      baseURL: `https://${this.serverName}${path}`
    });
  }

  async buscarListaEstoques() {
    try {
      const response = await this.axiosInstance.get('/estoque/?bodyLimit=10&pagelimit=1');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default EstoqueServices;