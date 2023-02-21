import { Grid, Container, Card } from '@mui/material';
import React from 'react';
import ContentCard from '../../utils/Card';
import { definitions } from '../../data/definitions';

const Library = () => (
    <Container>
        <Grid container spacing={2}>
            {definitions.map(def => (
                <Grid item xs={12} md={6}>
                    <ContentCard
                        header={def.name}
                        body={`${def.stimuli} \n ${def.text}`}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
);


export default Library;
