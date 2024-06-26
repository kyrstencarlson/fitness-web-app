import { toast } from './alerts';
import { api, addAuthorization, removeAuthorization } from './api';

export const localStorageKey = '__engine__';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  _id: string;
  roles: string[];
};

export const getAuth = (): AuthResponse => JSON.parse(localStorage.getItem(localStorageKey) || '{}');

//TODO DEFINE USER

export const setAuth = (data: AuthResponse) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    addAuthorization(data.accessToken);
};

export const login = async (payload: { email: string; password: string }) => api
    .post('/auth/login', payload)
    .then(({ data }: { data: AuthResponse }) => {
        // const { scope } = data;

        // const hasAccess = scope.filter((_scope) => _scope !== "user").length;

        // if (!hasAccess) {
        //   throw new Error("Access Denied");
        // }

        localStorage.setItem(localStorageKey, JSON.stringify(data));
        addAuthorization(data.accessToken);
        toast({
            icon: 'success',
            title: 'Signed In'
        });

        return data;
    })
    .catch(error => {
        toast({
            title: error.response?.data?.message || error.message,
            icon: 'error'
        });
    });

export const refresh = async (token: string) => api
    .post('/auth/refresh', { params: token })
    .then(({ data }: { data: AuthResponse }) => {
        // const { scope } = data;

        // const hasAccess = scope.filter((_scope) => _scope !== "user").length;

        // if (!hasAccess) {
        //   throw new Error("Access Denied");
        // }

        localStorage.setItem(localStorageKey, JSON.stringify(data));
        addAuthorization(data.accessToken);

        return data;
    });
// .catch((error) => {
//   toast({
//     title: error.response?.data?.message || error.message,
//     icon: "error",
//   });
// });

export const forceLogout = () => {
    localStorage.removeItem(localStorageKey);
    removeAuthorization();
};

export const logout = () => api.post('/auth/logout').then(forceLogout).catch(forceLogout);
