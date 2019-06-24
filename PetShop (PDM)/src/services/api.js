import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.23.151.49:3000/api'
})

export default api;