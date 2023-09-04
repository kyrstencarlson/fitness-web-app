import Axios, { AxiosError } from 'axios';
import { toast } from './alerts';

const baseURL = 'http://localhost:4000' || process.env.REACT_APP_API_URL;

const storedToken = JSON.parse(
    localStorage.getItem('__engine__') || '{}'
).accessToken;

const axiosOpts = {
    baseURL: `${baseURL}/api/`,
    timeout: 0,
    headers: {
        common: {
            'Content-Type': '*/*',
            'Access-Control-Allow-Origin': '*'
        }
    }
};

export const api = Axios.create(axiosOpts);

export const addHeader = (name: string, value: string): void => {
    api.defaults.headers.common[name] = value;
};

export const removeHeader = (name: string): void => {
    delete api.defaults.headers.common[name];
};

export const addAuthorization = (token: string): void => {
    addHeader('Authorization', token);
};

export const removeAuthorization = (): void => {
    removeHeader('Authorization');
};

api.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError) => {
        toast({
            icon: 'error',
            title: error.message
        });

        return Promise.reject(error);
    }
);

if (storedToken) {
    addAuthorization(storedToken);
}
