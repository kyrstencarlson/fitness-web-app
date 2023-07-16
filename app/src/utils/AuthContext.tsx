import * as React from 'react';
import { toast } from './alerts';
import { api } from './api';
import * as auth from './auth-provider';

interface AuthContextType extends Partial<auth.AuthResponse> {
    login(payload: { email: string; password: string }): void;
    logout():void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);


const configureInterceptor = (handle401: () => void) => {

    const doNothingIfSuccess = (response: any) => {

        if (response.data.errors) {

            toast({
                title: response?.data?.errors[0]?.message || 'Error',
                icon: 'error'
            });

            return Promise.reject(JSON.stringify(response.data.errors));
        }

        return response;
    };

    const handleFail = (error: any) => {

        if (error.response?.status === 401) {
            handle401();
        }

        return Promise.reject(error);
    };

    api.interceptors.response.use(
        doNothingIfSuccess,
        handleFail
    );
};

export interface AuthProviderProps {
    children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    // const navigate = useNavigate();
    const [authorization, setAuth] = React.useState<string>('');
    const { accessToken: storedAuthToken, _id, roles } = auth.getAuth();

    const handle401 = () => {
        auth.forceLogout();
        setAuth('');
        window.location.assign('/login');
    };

    configureInterceptor(handle401);


    React.useEffect(() => {

        if (!authorization && storedAuthToken) {
            setAuth(storedAuthToken);
        }

        if (!authorization && !storedAuthToken) {
            console.log('no auth');
            if (!window.location.pathname.includes('login')) {
                console.log('redirecting to login');
                window.location.replace('/login');
            }
        }

    }, [authorization, storedAuthToken]);

    const login: AuthContextType['login'] = async payload => {
        const user = await auth.login(payload);

        if (user) {
            setAuth(user.accessToken);
            window.location.assign('/');
        }
    };

    const logout = async () => {
        await auth.logout();
        setAuth('');
        window.location.assign('/login');
    };

    const contextValue = React.useMemo(() => ({
        login,
        logout,
        authorization,
        _id,
        roles
    }), [authorization]);

    return <AuthContext.Provider value={contextValue}> {children} </AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => React.useContext(AuthContext);
