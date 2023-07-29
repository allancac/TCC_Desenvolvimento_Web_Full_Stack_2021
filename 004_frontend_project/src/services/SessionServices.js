import axios from 'axios';
import config from './config'

class SessionServices {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${config.baseURL}`,
      withCredentials: true
    });
    // Verifica se o token está presente na local storage
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.setToken(this.token);
    }
  }
  setToken(token) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

  async logoutSession() {
    try {
      const user = await this.axiosInstance.get(`/auth/logout`);
      console.log(user)
      return user
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default SessionServices;
