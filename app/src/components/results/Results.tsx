import { Typography, Grid } from '@mui/material';
import React from 'react';

const Results = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setData(data.message));
    }, []);

    return (
        <Grid>
            <Typography>Results</Typography>

            <Typography>{data}</Typography>
        </Grid>
    );
};


export default Results;
