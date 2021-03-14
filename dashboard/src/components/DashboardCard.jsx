import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent } from '@material-ui/core';
import {Button, Typography, Grid} from '@material-ui/core';
import DashPlayer from './DashPlayer.jsx';

const useStyles = makeStyles({
  root: {
    background: '#b3bcd5',
    varient: 'outlined',
  },
});


function DashCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Grid container direction='column' 
        spacing={1} 
        justify = "center">
        <Grid item>
          <Typography variant = "h5" align="center">Leading Board</Typography>
        </Grid>
        <Grid item xs={12}>
            <DashPlayer />
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
}

export default DashCard;