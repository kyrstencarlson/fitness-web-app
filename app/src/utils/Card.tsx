import { Check } from '@mui/icons-material';
import { Typography, Card, CardActionArea, CardContent, CardHeader, LinearProgress, Divider, IconButton } from '@mui/material';
import React from 'react';

interface ContentCardProps {
    onClick?: () => void;
    header: string;
    body: string;
    style?: React.CSSProperties;
    rightElement?: JSX.Element;
}


const ContentCard = (props: ContentCardProps) => {

    const {
        header, body, style = {}, rightElement, onClick
    } = props;

    return (
        <Card style={{
            ...style,
            height: '100%'
        }}>
            <CardActionArea onClick={onClick}>
                <CardHeader sx={{ pb: 0.5 }} subheader={<Typography variant='h6'>{header}</Typography>}/>
                <CardContent sx={{ pt: 0.5 }}>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};


export default ContentCard;
