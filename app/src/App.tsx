import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
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
                    <Route path='admin' element={<Admin />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='workouts' element={<Workouts />} />
                    <Route path='workouts/:monthId' element={<Month />} />
                    <Route path='results' element={<Results />} />
                    <Route path='library' element={<Library />} />
                    <Route path='leaderboard' element={<Leaderboard />} />
                </Route>

                <Route path='*' element={<ErrorPage />} />

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgot' element={<ForgotPassword />} />
            </>
        )
    );

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};


export default App;
