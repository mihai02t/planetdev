import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent } from '@material-ui/core';
import {Button, Typography, Grid} from '@material-ui/core';
import DashboardPlayer from '../DashboardPlayer';

const useStyles = makeStyles({
    root: {
      background: '#b3bcd5',
      varient: 'outlined',
    },
});  

const DashboardCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction='column' spacing={1} justify="center">
                    <Grid item>
                        <Typography variant="h5" align="center">Leading Board</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <DashboardPlayer />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justify="center">
                    <Button variant="outlined" color="secondary">Exit</Button>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default DashboardCard;