import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://manmixserver.vercel.app/'
});

export default clienteAxios;