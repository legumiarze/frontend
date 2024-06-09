import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://a196-149-156-8-98.ngrok-free.app/api',
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    },
});

export default axiosClient;
