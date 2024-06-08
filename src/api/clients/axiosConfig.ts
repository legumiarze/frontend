import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://8775-149-156-8-98.ngrok-free.app/api',
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
