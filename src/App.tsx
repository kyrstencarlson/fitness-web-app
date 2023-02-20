import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Link,
    Outlet,
    createRoutesFromElements,
    Route,
    Routes
} from 'react-router-dom';
import { ErrorPage } from './components/NotFoundPage';
import { Box, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { darkTheme, lightTheme } from './theme';
import { ResponsiveDrawer } from './components/DefaultLayout';
import Home from './components/Home';
import About from './components/about/About';
import Profile from './components/profile/Profile';
import Results from './components/results/Results';
import Workouts from './components/workouts/Workouts';
import Month from './components/workouts/Month';

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
                    <Route path='about' element={<About />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='workouts' element={<Workouts />} />
                    <Route path='workouts/:workoutId' element={<Month />} />
                    <Route path='results' element={<Results />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
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
