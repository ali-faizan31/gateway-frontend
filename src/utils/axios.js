import axios from 'axios';

// ----------------------------------------------------------------------

const AxiosInstance = axios.create();


AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);



export default AxiosInstance;
