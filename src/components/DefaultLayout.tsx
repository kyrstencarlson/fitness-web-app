import * as React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AccountCircle, Book, Circle, FitnessCenter, HeartBroken, Home, House, InfoOutlined, Leaderboard, LibraryBooks, Logout, Menu } from '@mui/icons-material';
import { BasicSpeedDial } from './SpeedDial';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  // child component is for dark mode toggle
  children?: React.ReactNode;
}

export const ResponsiveDrawer = (props: Props) => {

    const { window, children } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const theme = useTheme();
    const container = window === undefined ? undefined : () => window().document.body;

    const path = pathname.split('/')[1];
    const currentLocation = drawerItems.find(item => item.path === pathname) || drawerItems.find(item => item.text.toLowerCase() === path);
    const currentIndex = currentLocation ? drawerItems.indexOf(currentLocation) : -1;


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {drawerItems.map((item, index) => {
                    const active = currentIndex === index;

                    return (
                        <ListItem key={item.path} selected={active} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon sx={{ pl: 1 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ textTransform: 'capitalize' }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

                <Divider style={{ margin: '20px 0' }} />
                <ListItemButton onClick={() => console.log('logout')}>
                    <ListItemIcon sx={{ pl: 1 }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' }
                        }}
                    >
                        <Menu />
                    </IconButton>

                    <Typography variant='h6' noWrap component='div'>
                        The Gains Lab
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {children}
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 }
                }}
                aria-label='mailbox folders'
            >
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'none'
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block'
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                <Box sx={{ minHeight: '55vh' }}>
                    <Outlet />
                </Box>
                {/* <BasicSpeedDial theme={theme} /> */}
            </Box>
        </Box>
    );
};

const drawerItems = [
    {
        text: 'Home',
        icon: <Home />,
        path: '/'
    },
    {
        text: 'Workouts',
        icon: <FitnessCenter />,
        path: '/workouts'
    },
    {
        text: 'Results',
        icon: <Book />,
        path: '/results'
    },
    {
        text: 'Leaderboard',
        icon: <Leaderboard />,
        path: '/leaderboard'
    },
    {
        text: 'Library',
        icon: <LibraryBooks />,
        path: '/library'
    },
    {
        text: 'About',
        icon: <InfoOutlined />,
        path: '/about'
    },
    {
        text: 'Profile',
        icon: <AccountCircle />,
        path: '/profile'
    }
];
