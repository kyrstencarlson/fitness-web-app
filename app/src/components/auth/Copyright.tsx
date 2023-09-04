import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Copyright = (props: any) => (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
        {'Copyright © '}
        <Link color='inherit' href='https://thegainslab.com/'>The Gains Lab</Link>
        {' 2023.'}
    </Typography>
);

export default Copyright;
