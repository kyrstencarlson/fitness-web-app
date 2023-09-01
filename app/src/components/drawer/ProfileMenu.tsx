import { AccountCircle } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserProfile } from '../../api';
import { useAuth } from '../../utils/AuthContext';

export const AccountMenu = (props: { darkMode: React.ReactNode }) => {

    const { darkMode } = props;

    const { _id, logout } = useAuth();
    const navigate = useNavigate();

    const { data: user } = useGetUserProfile(_id as string, { enabled: !!_id });

    const name = user?.first_name ?? user?.last_name ?? 'P';
    const initial = name.charAt(0).toUpperCase();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <Tooltip title='Profile'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{
                            width: 32,
                            height: 32,
                            color: 'black'
                        }}>
                            {initial}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: 175,
                        pl: 1,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <ListItemIcon>
                        <AccountCircle fontSize='small' />
                    </ListItemIcon>
                        Profile
                </MenuItem>

                {darkMode}

                <Divider />

                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                        Settings
                </MenuItem> */}
                <MenuItem onClick={() => _id && logout()}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                        Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};
