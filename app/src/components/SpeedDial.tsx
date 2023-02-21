import * as React from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { alert, toast } from '../utils/alerts';
import { BreakfastDining, NotificationImportant } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';

interface Props {
    theme: Theme;
}
interface Action {
    icon: JSX.Element;
    name: string;
    onClick: () => void;
}


export const BasicSpeedDial = ({ theme }: Props) => {

    const actions: Action[] = [
        {
            icon: <BreakfastDining />,
            name: 'Toast',
            onClick: () => toast({
                title: 'I am a toast!',
                theme
            })
        },
        {
            icon: <NotificationImportant />,
            name: 'Alert',
            onClick: () => alert.fire({
                title: 'I am an alert!',
                background: theme.palette.background.paper,
                color: theme.palette.text.primary
            })
        }
    ];

    return (
        <Box sx={{
            height: 320,
            transform: 'translateZ(0px)',
            flexGrow: 1
        }}>
            <SpeedDial
                ariaLabel='SpeedDial basic example'
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16
                }}
                icon={<SpeedDialIcon />}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};
