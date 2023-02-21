import { BarChart } from '@mui/icons-material';
import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import React from 'react';

interface ContentCardProps {
    icon: JSX.Element;
    text: string;
    placement?: TooltipProps['placement'];
    onClick?: () => void;
}


const ContentCard = (props: ContentCardProps) => {

    const {
        icon, text, placement = 'bottom', onClick
    } = props;

    return (
        <Tooltip title={text} placement={placement}>
            <IconButton onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
};


export default ContentCard;
