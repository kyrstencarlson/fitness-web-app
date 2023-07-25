import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isDevelopment = process.env.NODE_ENV === 'development';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 5, // 5 minutes
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
                    {/* engine */}
                    <Route path='/engine/workouts' element={<Workouts />} />
                    <Route path='/engine/workouts/:monthId' element={<Month />} />
                    <Route path='/engine/results' element={<Results />} />
                    <Route path='/engine/library' element={<Library />} />
                    <Route path='/engine/leaderboard' element={<Leaderboard />} />
                    {/* skills */}
                    <Route path='/skills/workouts' element={<Workouts />} />
                    <Route path='/skills/workouts/:monthId' element={<Month />} />
                    <Route path='/skills/results' element={<Results />} />
                    <Route path='/skills/library' element={<Library />} />
                    <Route path='/skills/leaderboard' element={<Leaderboard />} />
                    {/* strength */}
                    <Route path='/strength/workouts' element={<Workouts />} />
                    <Route path='/strength/workouts/:monthId' element={<Month />} />
                    <Route path='/strength/results' element={<Results />} />
                    <Route path='/strength/library' element={<Library />} />
                    <Route path='/strength/leaderboard' element={<Leaderboard />} />
                    {/* user */}
                    <Route path='profile' element={<Profile />} />
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
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </AuthProvider>

                {/* {isDevelopment && <ReactQueryDevtools  initialIsOpen={true} />} */}
            </QueryClientProvider>
        </React.StrictMode>
    );
};


export default App;
