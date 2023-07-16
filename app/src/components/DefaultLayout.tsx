import {
  AccountCircle,
  AccountCircleTwoTone,
  AdminPanelSettings,
  ArrowBack,
  Book,
  FitnessCenter,
  Home,
  InfoOutlined,
  Leaderboard,
  LibraryBooks,
  Login,
  Logout,
  Menu,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
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
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { getScope } from "../utils/scope";

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
  const { logout, scope = [] } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const _scope = getScope(scope);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
      if (/admin/.test(pathname) && _scope === 'admin') {
          navigate('/admin');
      }
  }, [pathname]);

  const theme = useTheme();
  const container =
    _window === undefined ? undefined : () => _window().document.body;

  const path = pathname.split("/")[1];
  const currentLocation =
    drawerItems.find((item) => item.path === pathname) ||
    drawerItems.find((item) => item.text.toLowerCase() === path);
  const currentIndex = currentLocation
    ? drawerItems.indexOf(currentLocation)
    : -1;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerItems.map((item, index) => {
          const active = currentIndex === index;

          return (
            <ListItem key={item.path} selected={active} disablePadding>
              <ListItemButton onClick={() => item.path ? navigate(item.path) : window.open(item.open, '_blank')}>
                <ListItemIcon sx={{ pl: 1 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ textTransform: "capitalize" }} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <Divider style={{ margin: "20px 0" }} />

        <ListItemButton onClick={() => logout()}>
          <ListItemIcon sx={{ pl: 1 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>

        <Divider style={{ margin: "20px 0" }} />

        <ListItemButton onClick={() => navigate('/admin')}>
          <ListItemIcon sx={{ pl: 1 }}>
            <AdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary={"Admin"} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            The Gains Lab
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {children}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ minHeight: "55vh" }}>
          <Button
            startIcon={<ArrowBack />}
            variant="text"
            onClick={() => navigate(-1)}
            sx={{ marginBottom: 2 }}
          >
            Back
          </Button>
          <Outlet />
        </Box>
        {/* <BasicSpeedDial theme={theme} /> */}
      </Box>
    </Box>
  );
};

const drawerItems = [
  {
    text: "Home",
    icon: <Home />,
    path: "/",
  },
  {
    text: "Workouts",
    icon: <FitnessCenter />,
    path: "/workouts",
  },
  {
    text: "Results",
    icon: <Book />,
    path: "/results",
  },
  {
    text: "Leaderboard",
    icon: <Leaderboard />,
    path: "/leaderboard",
  },
  {
    text: "Library",
    icon: <LibraryBooks />,
    path: "/library",
  },
  {
    text: "About",
    icon: <InfoOutlined />,
    open: 'https://www.thegainslab.com/yoeinfo'
  },
  {
    text: "Profile",
    icon: <AccountCircle />,
    path: "/profile",
  },
];
