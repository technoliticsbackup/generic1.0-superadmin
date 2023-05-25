
import axios from 'axios';
// const BASE_URL = 'http://localhost:8000/supperadmin';
const BASE_URL = 'https://genricapi.mytechnoschool.com/supperadmin';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
