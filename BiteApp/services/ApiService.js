import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'http://18.217.80.196:5000/', 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
  },
  timeout: 10000, 
});

ApiService.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

ApiService.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status === 500) {
    error.message = 'Server Error, Please try again later.';
  }
  return Promise.reject(error);
});

export default ApiService;
