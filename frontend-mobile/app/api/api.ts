import axios from 'axios';
 
const access_token = '';
const baseURL = 'https://giftr.dev/api';

const api = axios.create({
    baseURL: baseURL, 
    timeout: 10000,                    
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${access_token}`
    },
});

export default api;
