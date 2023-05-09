import { CheckCircle } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

interface ContentCardProps {
    onClick?: () => void;
    header: string;
    body: string;
    style?: React.CSSProperties;
    complete?: boolean;
}


const ContentCard = (props: ContentCardProps) => {

    const {
        header, body, style = {}, complete, onClick
    } = props;

    return (
        <Card style={{
            ...style,
            height: '100%'
        }}>
            <CardActionArea onClick={onClick} disabled={!onClick}>
                <CardHeader
                    sx={{ pb: 0.5 }}
                    subheader={<Typography variant='h6'>{header}</Typography>}
                    action={complete && <CheckCircle color='secondary' />}
                />
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
