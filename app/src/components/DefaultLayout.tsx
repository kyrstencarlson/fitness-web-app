import {
    AccountCircle,
    AdminPanelSettings,
    ArrowBack,
    Book,
    Edit,
    ExpandLess,
    ExpandMore,
    FitnessCenter,
    Home,
    InfoOutlined,
    Leaderboard,
    LibraryBooks,
    Logout,
    Menu,
    Rocket,
    SportsGymnastics
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Collapse,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
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

const drawerWidth = 240;

interface NestedListProps {
  isOpen?: boolean;
  type: 'engine' | 'skills' | 'strength';
  icon: React.ReactNode;
  drawerItems: any[];
}

interface Props {
  _window?: () => Window;
  // child component is for dark mode toggle
  children?: React.ReactNode;
}

export const ResponsiveDrawer = (props: Props) => {
    const { _window, children } = props;

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { logout, roles = [] } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const _scope = getScope(roles);
    const isAdmin = _scope.includes('admin');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // React.useEffect(() => {
    //     if (/admin/.test(pathname) && _scope.includes('admin')) {
    //         navigate('/admin');
    //     }
    // }, [pathname]);

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

    const NestedList = (props: NestedListProps) => {
        const {
            isOpen = true, icon, drawerItems, type
        } = props;
        const [open, setOpen] = React.useState(isOpen);


        if (type === 'engine' && !_scope.includes('engine') && !_scope.includes('admin')) {
            return null;
        }

        if (type === 'skills' && !_scope.includes('skills') && !_scope.includes('admin')) {
            return null;
        }

        if (type === 'strength' && !_scope.includes('strength') && !_scope.includes('admin')) {
            return null;
        }

        const handleClick = () => {
            setOpen(!open);
        };

        return (
            <List
                key={drawerItems[0].text}
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
                component='nav'
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon sx={{ pl: 1 }}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={type} sx={{ textTransform: 'capitalize' }} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List key={`list-${drawerItems[0].text}`} component='div' disablePadding>
                        {drawerItems.map((item, index) => {
                            const active = currentIndex === index;

                            return (
                                <ListItem key={item.path + index} selected={active} disablePadding>
                                    <ListItemButton onClick={() => (item.path ? navigate(item.path) : window.open(item.open, '_blank'))}>
                                        <ListItemIcon sx={{ pl: 3 }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} sx={{
                                            textTransform: 'capitalize',
                                            pl: 2
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            </List>
        );
    };


    const drawer = (
        <div>
            <Toolbar />
            <Divider />

            <List>
                <ListItemButton onClick={() => navigate('/')}>
                    <ListItemIcon sx={{ pl: 1 }}>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItemButton>

                <NestedList type='engine' icon={<Rocket />} drawerItems={engineDrawerItems} />

                {/* todo skills app */}
                <NestedList type='skills' icon={<SportsGymnastics />} drawerItems={skillsDrawerItems} isOpen={false} />

                <NestedList type='strength' icon={<FitnessCenter />} drawerItems={strengthDrawerItems} isOpen={false} />

                <Divider style={{ margin: '20px 0' }} />

                <ListItemButton onClick={() => logout()}>
                    <ListItemIcon sx={{ pl: 1 }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItemButton>

                <Divider style={{ margin: '20px 0' }} />

                <ListItemButton onClick={() => navigate('/profile')}>
                    <ListItemIcon sx={{ pl: 1 }}>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={'Profile'} />
                </ListItemButton>

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
