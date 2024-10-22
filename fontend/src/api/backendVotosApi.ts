import axios, { InternalAxiosRequestConfig } from 'axios';

//Instancia de axios
const backendVotosApi = axios.create({
    baseURL: import.meta.env.VITE_URL_API as string
});

backendVotosApi.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    request.headers.set('x-token', localStorage.getItem('ProyectoFinal-Token'))

    return request;
});

export default backendVotosApi;
