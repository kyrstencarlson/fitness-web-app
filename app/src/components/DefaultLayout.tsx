import {
    AdminPanelSettings,
    ArrowBack,
    Book,
    FitnessCenter,
    Home,
    InfoOutlined,
    Leaderboard,
    LibraryBooks,
    Menu as MenuIcon,
    Rocket,
    SportsGymnastics
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { getScope } from '../utils/scope';
import { NestedList } from './drawer/NestedList';
import { AccountMenu } from './drawer/ProfileMenu';

const drawerWidth = 240;


interface Props {
  _window?: () => Window;
  // child component is for dark mode toggle
  children?: React.ReactNode;
}

export const ResponsiveDrawer = (props: Props) => {
    const { _window, children } = props;

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { _id, logout, roles = [] } = useAuth();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const _scope = getScope(roles);
    const isAdmin = _scope.includes('admin');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        if (/admin/.test(pathname) && _scope.includes('admin')) {
            navigate('/admin');
        }

        if (_scope.length === 1 && _scope[0] !== 'admin') {
            navigate(`/${_scope[0]}/workouts`);
        }
    }, [pathname]);

    const theme = useTheme();
    const container =
    _window === undefined ? undefined : () => _window().document.body;

    const path = pathname.split('/')[1];
    const currentLocation =
    engineDrawerItems.find(item => item.path === pathname) ||
    engineDrawerItems.find(item => item.text.toLowerCase() === path);
    const currentIndex = currentLocation
        ? engineDrawerItems.indexOf(currentLocation)
        : -1;
    const isHome = pathname === '/';


    const showHome = _scope.includes('admin') || _scope.length > 1;

    const drawer = (
        <div>
            <Toolbar />
            <Divider />

            <List>
                {showHome &&
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon sx={{ pl: 1 }}>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                }

                <NestedList
                    type='engine'
                    icon={<Rocket />}
                    drawerItems={engineDrawerItems}
                    currentIndex={currentIndex}
                    scope={_scope}
                />
                <NestedList
                    type='skills'
                    icon={<SportsGymnastics />}
                    drawerItems={skillsDrawerItems}
                    isOpen={false}
                    currentIndex={currentIndex}
                    scope={_scope}
                />
                <NestedList
                    type='strength'
                    icon={<FitnessCenter />}
                    drawerItems={strengthDrawerItems}
                    isOpen={false}
                    currentIndex={currentIndex}
                    scope={_scope}
                />

                <Divider style={{ margin: '20px 0' }} />

                {/* toggle dark mode from App.tsx */}
                {/* {children} */}

                {isAdmin &&
                    <ListItemButton onClick={() => navigate('/admin')}>
                        <ListItemIcon sx={{ pl: 1 }}>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Admin'} />
                    </ListItemButton>
                }
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
                        <MenuIcon />
                    </IconButton>

                    <Typography variant='h6' noWrap component='div'>
                        The Gains Lab
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <AccountMenu darkMode={children}/>

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
                    {!isHome &&
                        <Button
                            startIcon={<ArrowBack />}
                            variant='text'
                            onClick={() => navigate(-1)}
                            sx={{ marginBottom: 2 }}
                        >
                            Back
                        </Button>
                    }
                    <Outlet />
                </Box>
                {/* <BasicSpeedDial theme={theme} /> */}
            </Box>
        </Box>
    );
};


const engineDrawerItems = [
    {
        text: 'Workouts',
        icon: <FitnessCenter />,
        path: '/engine/workouts'
    },
    {
        text: 'Results',
        icon: <Book />,
        path: '/engine/results'
    },
    {
        text: 'Leaderboard',
        icon: <Leaderboard />,
        path: '/engine/leaderboard'
    },
    {
        text: 'Library',
        icon: <LibraryBooks />,
        path: '/engine/library'
    },
    {
        text: 'About',
        icon: <InfoOutlined />,
        open: 'https://www.thegainslab.com/yoeinfo'
    }
];

const skillsDrawerItems = [
    // {
    //     text: 'Workouts',
    //     icon: <FitnessCenter />,
    //     path: '/engine/workouts'
    // },
    // {
    //     text: 'Results',
    //     icon: <Book />,
    //     path: '/engine/results'
    // },
    // {
    //     text: 'Leaderboard',
    //     icon: <Leaderboard />,
    //     path: '/engine/leaderboard'
    // },
    // {
    //     text: 'Library',
    //     icon: <LibraryBooks />,
    //     path: '/engine/library'
    // },
    {
        text: 'About',
        icon: <InfoOutlined />,
        open: 'https://www.thegainslab.com/yoeinfo'
    }
];

const strengthDrawerItems = [
    // {
    //     text: 'Workouts',
    //     icon: <FitnessCenter />,
    //     path: '/engine/workouts'
    // },
    // {
    //     text: 'Results',
    //     icon: <Book />,
    //     path: '/engine/results'
    // },
    // {
    //     text: 'Leaderboard',
    //     icon: <Leaderboard />,
    //     path: '/engine/leaderboard'
    // },
    // {
    //     text: 'Library',
    //     icon: <LibraryBooks />,
    //     path: '/engine/library'
    // },
    {
        text: 'About',
        icon: <InfoOutlined />,
        open: 'https://www.thegainslab.com/yoeinfo'
    }
];
