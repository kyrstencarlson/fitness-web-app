import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, ListItemIcon, MenuItem, ThemeProvider } from '@mui/material';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ResponsiveDrawer } from './components/DefaultLayout';
import Home from './components/Home';
import { ErrorPage } from './components/NotFoundPage';
import Admin from './components/admin/Admin';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Leaderboard from './components/engine/leaderboard/Leaderboard';
import Library from './components/engine/library/Library';
import Profile from './components/engine/profile/Profile';
import Results from './components/engine/results/Results';
import Month from './components/engine/workouts/Month';
import Workouts from './components/engine/workouts/Workouts';
import SkillsHome from './components/skills/Home';
import StrengthHome from './components/strength/Home';
import { darkTheme, lightTheme } from './theme';
import { AuthProvider } from './utils/AuthContext';
import { localStorageKey } from './utils/auth-provider';
import Users from './components/admin/users/Users';

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

    const storage = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    const [darkMode, setDarkMode] = React.useState(storage.darkMode || false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem(localStorageKey, JSON.stringify({
            ...storage,
            darkMode: !darkMode
        }));
    };


    const HeaderLayout = () => (
        <ResponsiveDrawer>
            <MenuItem onClick={toggleDarkMode}>
                <ListItemIcon>
                    {darkMode ? <LightMode /> : <DarkMode /> }
                </ListItemIcon>
                {`${darkMode ? 'Light' : 'Dark'} Mode`}
            </MenuItem>
            {/* <IconButton onClick={() => setDarkMode(!darkMode)} color='inherit'> */}
            {/* {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton> */}
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
                    <Route path='/skills/workouts' element={<SkillsHome />} />
                    {/* <Route path='/skills/workouts/:monthId' element={<Month />} />
                    <Route path='/skills/results' element={<Results />} />
                    <Route path='/skills/library' element={<Library />} />
                    <Route path='/skills/leaderboard' element={<Leaderboard />} /> */}
                    {/* strength */}
                    <Route path='/strength/workouts' element={<StrengthHome />} />
                    {/* <Route path='/strength/workouts/:monthId' element={<Month />} />
                    <Route path='/strength/results' element={<Results />} />
                    <Route path='/strength/library' element={<Library />} />
                    <Route path='/strength/leaderboard' element={<Leaderboard />} /> */}
                    {/* user */}
                    <Route path='profile' element={<Profile />} />
                    {/* admin */}
                    <Route path='admin' element={<Admin />} />
                    <Route path='admin/users' element={<Users />} />
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
