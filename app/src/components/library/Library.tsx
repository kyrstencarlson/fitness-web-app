import { Grid, Container, Card } from '@mui/material';
import React from 'react';
import ContentCard from '../../utils/Card';
import { definitions } from '../../data/definitions';

const Library = () => (
    <Container>
        <Grid container spacing={3}>
            {definitions.map(def => (
                <Grid item xs={12} md={6}>
                    <ContentCard
                        header={def.type}
                        body={def.description}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
);


export default Library;
