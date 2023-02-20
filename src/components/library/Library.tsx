import { Typography, Grid, Container, Card } from '@mui/material';
import React from 'react';
import ContentCard from '../../utils/Card';

export const definitions = [
    {
        name: 'Endurance',
        text: 'The intended stimulus of Endurance Day is a consistent, low intensity pace, about a 6-7 out of 10 in terms of perceived exertion. If you use a heart rate monitor, aim for 70 to 75%. This recrults your slow twitch fibers. The adaptations to this stimulus are increased blood pumped per heartbeat, increased oxygen carrying capability in blood, and increased capillary blood supply.'
    },
    {
        name: 'Speed / Threshold',
        text: 'The intended stimulus of Speed Day is to work at the fastest pace you can hold. This roughly mirror what you\'d feel in a MetCon (or a sparring match). It is better to begin a bit slowly and increase, adaptations to this stimulus include increased oxidative capacity and development of the ability to neutralize protons and transport lactate. Fast twitch fibers are not broadly recruited.'
    },
    {
        name: 'Max Aerobic Power',
        text: 'The inteded stiumulus of Max Aerobic Power Day is maximal sustainable intensity. Scores of 100, 100, 100, 100, 100 are better than score of 110, 105, 100, 95, 90. If you are unsure of your pace, start slowly and gradually increase, ie. 90, 95, 100, 105, 110. After a few weeks you will be able to pace it by feel. The adaptations include pacing sensitivity and increased power from oxidative energy.'

    },
    {
        name: 'Anaerobic',
        text: 'The intended stimulus of Anaerobic Day is to go as fast as you can every interval. Anaerobic Day recruits primarily fast twitch fibers. It is OK if your speed drops off between intervals. Just attack every interval with max effort. The adantations of Anaerobic Day are increased top end power and increased sustainability at sub-maximal intensity.'
    },
    {
        name: 'Intervals',
        text: 'The intended stimulus of Interval Days is the highest consistent score. The work to rest ratio will determine the intensity of the interval. The adaptation is increased sustainability of high power output. Intervals are integral for developing pacing by field, and are foundational for developing sustainable work capacity at every intensity. Intervals will be part of the program in all phases.'
    }
];

const Library = () => (
    <Container>
        <Grid container spacing={2}>
            {definitions.map(def => (
                <Grid item xs={12} md={6}>
                    <ContentCard
                        header={def.name}
                        body={def.text}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
);


export default Library;
