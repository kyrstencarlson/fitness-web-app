import { Typography, Grid } from '@mui/material';
import React from 'react';
import { file } from '../data/import';
import { Day, DayType, Month, PaceType, Stage, Workout } from '../types';

const Home = () => {

    const x = 1;

    const data: any = [];
    for (const f of file) {

        const found = data.find((item: any) => item.day === f.day);

        const stages: Stage[] = [];
        if (f.type === 'flux stages') {
            const numStages = f.numFluxStages;
            const numFluxes = f.fluxesPerStage;

            for (let i = 0; i < numStages; i++) {

                const locations: number[] = [];
                const location = f.work + f.fluxWork;
                const endRoundLoc = location * numFluxes;

                if (i > 0) {
                    for (let j = 0; j < numFluxes; j++) {
                        locations.push(endRoundLoc + location * (j + 1));
                    }
                }
                else {
                    for (let j = 0; j < numFluxes; j++) {
                        locations.push(location * (j + 1));
                    }
                }

                const stage: Stage = {
                    increase: `${f?.increase * (i + 1)}%`,
                    time: f.fluxWork,
                    locations
                };
                stages.push(stage);
            }
        }

        //TODO change in work and rest

        const workout: Workout = {
            rounds: f.rounds,
            work: f.work,
            rest: f.rest,
            fluxWork: f.fluxWork,
            pace: (f.pace ?? '') as PaceType,
            stages
        };
        if (found) {
            found.workout.push(workout);
        }
        else {
            const reshape: Day = {
                day: f.day,
                week: f.week,
                month: f.month,
                type: f.type as DayType,
                workout: [workout]
            };

            data.push(reshape);
        }
    }

    // console.log(data[300]);

    return (
        <Grid>
            <Typography>Home</Typography>
        </Grid>
    );
};


export default Home;
