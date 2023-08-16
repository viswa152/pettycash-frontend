import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
export function Copyright(props) {
    return (
        <Typography variant="body2" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Madhumidha
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
