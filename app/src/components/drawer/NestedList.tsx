import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NestedListProps {
  isOpen?: boolean;
  type: 'engine' | 'skills' | 'strength';
  icon: React.ReactNode;
  drawerItems: any[];
  scope: string[];
  currentIndex: number;
}

export const NestedList = (props: NestedListProps) => {
    const {
        isOpen = true, icon, drawerItems, type, scope, currentIndex
    } = props;

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(isOpen);


    if (type === 'engine' && !scope.includes('engine') && !scope.includes('admin')) {
        return null;
    }

    if (type === 'skills' && !scope.includes('skills') && !scope.includes('admin')) {
        return null;
    }

    if (type === 'strength' && !scope.includes('strength') && !scope.includes('admin')) {
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
