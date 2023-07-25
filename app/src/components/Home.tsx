import { FitnessCenter, Rocket, SportsGymnastics } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

interface HomeCardProps {
    title: string;
    onClick: () => void;
    Icon: React.ReactNode;
}


const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const { roles } = auth;

    const options = [
        {
            title: 'Engine',
            onClick: () => navigate('/engine/workouts'),
            Icon: <Rocket fontSize='large'/>
        },
        {
            title: 'Skills',
            onClick: () => navigate('/skills/workouts'),
            Icon: <SportsGymnastics fontSize='large'/>
        },
        {
            title: 'Strength',
            onClick: () => navigate('/strength/workouts'),
            Icon: <FitnessCenter fontSize='large'/>
        }
    ];

    const HomeCard = (props: HomeCardProps) => {

        const { title, onClick, Icon } = props;

        return (
            <Grid item xs={12} md={4}>
                <Card >
                    <CardActionArea onClick={onClick}>
                        <CardContent>
                            <Typography variant='h6' mb={2}>
                                {title}
                            </Typography>
                            {Icon}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };


    return (
        <Grid container spacing={2}>
            {options.map((option, i) => {
                if (!roles?.includes(option.title.toLowerCase())) {
                    if (!roles?.includes('admin')) {
                        return null;
                    }
                }

                return (
                    <HomeCard key={i} {...option}/>
                );
            })}

        </Grid>
    );
};
export default Home;
