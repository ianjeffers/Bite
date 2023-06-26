import axios from 'axios';

class ApiService {
  
  async get(endpoint, params) {
    try {
      const response = await axios.get(`http://18.217.80.196:5000/${endpoint}`, { params });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        error.message = 'Server Error, Please try again later.';
      }
      console.error('Failed to perform GET request:', error);
      throw error;
    }
  }
  
  async post(endpoint, data) {
    try {
      const response = await axios.post(`http://18.217.80.196:5000${endpoint}`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        error.message = 'Server Error, Please try again later.';
      }
      console.error('Failed to perform POST request:', error);
      throw error;
    }
  }
  
}

export default new ApiService();
