import axios from 'axios';
import config from './config'

class SessionServices {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${config.baseURL}`,
      withCredentials: true
    });
  }

  async getSession() {
    try {
      const { data: { user } } = await this.axiosInstance.get(`/auth/login/success`);
      return user
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default SessionServices;
