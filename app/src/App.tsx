import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import {
    BrowserRouter,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate
} from 'react-router-dom';
import Admin from './components/Admin';
import { ResponsiveDrawer } from './components/DefaultLayout';
import Home from './components/Home';
import { ErrorPage } from './components/NotFoundPage';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Leaderboard from './components/leaderboard/Leaderboard';
import Library from './components/library/Library';
import Profile from './components/profile/Profile';
import Results from './components/results/Results';
import Month from './components/workouts/Month';
import Workouts from './components/workouts/Workouts';
import { darkTheme, lightTheme } from './theme';
import { AuthProvider } from './utils/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query';

const isDevelopment = process.env.NODE_ENV === 'development';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 5 * 60 * 1000,
            staleTime: Infinity
        }

    }
});


const App = () => {

    const [darkMode, setDarkMode] = React.useState(false);

    const HeaderLayout = () => (
        <ResponsiveDrawer>
            <IconButton onClick={() => setDarkMode(!darkMode)} color='inherit'>
                {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
        </ResponsiveDrawer>
    );

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<HeaderLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='workouts' element={<Workouts />} />
                    <Route path='workouts/:monthId' element={<Month />} />
                    <Route path='results' element={<Results />} />
                    <Route path='library' element={<Library />} />
                    <Route path='leaderboard' element={<Leaderboard />} />
                    {/* admin */}
                    <Route path='admin' element={<Admin />} />
                </Route>

                <Route path='*' element={<ErrorPage />} />

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgot' element={<ForgotPassword />} />
            </>
        )
    );

    return (
        <React.StrictMode>

            {/* <QueryClientProvider client={queryClient}> */}
            <AuthProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>

            {/* {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
           </QueryClientProvider> */}
        </React.StrictMode>
    );
};


export default App;
