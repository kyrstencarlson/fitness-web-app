import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import React from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ResponsiveDrawer } from './components/DefaultLayout';
import Home from './components/Home';
import { ErrorPage } from './components/NotFoundPage';
import About from './components/about/About';
import Leaderboard from './components/leaderboard/Leaderboard';
import Library from './components/library/Library';
import Profile from './components/profile/Profile';
import Results from './components/results/Results';
import Day from './components/workouts/Day';
import Month from './components/workouts/Month';
import Workouts from './components/workouts/Workouts';
import { darkTheme, lightTheme } from './theme';
// import ResponsiveDrawer from './components/DefaultLayout copy';

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
