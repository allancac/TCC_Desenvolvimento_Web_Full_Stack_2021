import axios from 'axios';
const serverName = 'virtserver.swaggerhub.com/'
const path = 'allancac/vendas_emasa/1.0.0'

class VendasServices {
  constructor() {
    this.serverName = serverName;
    this.axiosInstance = axios.create({
      baseURL: `https://${this.serverName}${path}`
    });
  }

  async enviarDadosDeVenda(venda) {
    try {
      const response = await this.axiosInstance.post('/vendas', venda);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default VendasServices;