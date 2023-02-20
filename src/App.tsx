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
import Month from './components/workouts/Month';
import Library from './components/library/Library';
import Day from './components/workouts/Day';
import Leaderboard from './components/leaderboard/Leaderboard';

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
                    <Route path='workouts/:monthId' element={<Month />} />
                    <Route path='workouts/:monthId/:weekId' element={<Day />} />
                    <Route path='results' element={<Results />} />
                    <Route path='library' element={<Library />} />
                    <Route path='leaderboard' element={<Leaderboard />} />
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
