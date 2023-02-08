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
import { useTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import { ResponsiveDrawer } from './components/DefaultLayout';

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
                    <Route path='/' element={<div>home</div>} />
                    <Route path='foo' element={<div>foo</div>} />
                    <Route path='bar' element={<div>bar</div>} />
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
