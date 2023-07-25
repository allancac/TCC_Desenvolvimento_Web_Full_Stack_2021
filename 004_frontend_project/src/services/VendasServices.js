import axios from 'axios';
import config from './config'

class VendasServices {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${config.baseURL}`,
      withCredentials: true
    });
  }

  async enviarDadosDeVenda(venda) {
    try {
      const response = await this.axiosInstance.post('/vendas', venda);
      console.log("Resposta do servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default VendasServices;