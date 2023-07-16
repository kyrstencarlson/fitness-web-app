import * as React from 'react';
import { api } from './api';
import { toast } from './alerts';
import * as auth from './auth-provider';
import { useNavigate, useNavigation } from 'react-router-dom';

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

    // const navigate = useNavigation();
    const [authorization, setAuth] = React.useState<string>('');
    const { authorization: storedAuthToken, id, scope } = auth.getAuth();

    const handle401 = () => {
        console.log('401');
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
            // window.location.assign('/login');
        }

    }, [authorization, storedAuthToken]);

    const login: AuthContextType['login'] = async payload => {
        const user = await auth.login(payload);

        if (user) {
            setAuth(user?.authorization);
        }
    };

    const logout = async () => {
        await auth.logout();
        setAuth('');
    };

    const contextValue = React.useMemo(() => ({
        login,
        logout,
        authorization,
        id,
        scope
    }), [authorization]);

    return <AuthContext.Provider value={contextValue}> {children || <></>} </AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => React.useContext(AuthContext);
