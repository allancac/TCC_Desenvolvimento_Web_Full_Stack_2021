import axios from 'axios';
const serverName = 'virtserver.swaggerhub.com/'
const path = 'allancac/vendas_emasa/1.0.0'

class ProdutosServices {
  constructor() {
    this.serverName = serverName;
    this.axiosInstance = axios.create({
      baseURL: `https://${this.serverName}${path}`
    });
  }

  async buscarListaProdutos() {
    try {
      const response = await this.axiosInstance.get('/produtos/?bodyLimit=10&pagelimit=1');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProdutosServices;