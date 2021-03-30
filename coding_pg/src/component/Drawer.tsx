import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Typography, Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChallengeContent from './ChallengeContent'
import InstructionContent from './InstructionContent'

const drawerWidth = 380;

const drawerStyles = makeStyles((theme: Theme) =>
createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(0.6),
    textAlign: "center",
    
  },
  title1: {
    textAlign: "left",
    fontSize: "2rem",
  },
  title2: {
    textAlign: "right",
    fontSize: 15,
  }
}));

const Instruction = () => {
    const classes = drawerStyles();
  
    return (<Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
            <div className={classes.toolbar}>
              <Grid container direction="column">
              <Grid item>
                <Typography className={classes.title1}>&ensp;PlanetDev</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.title2}> -- Python&emsp;</Typography>
              </Grid>
              </Grid>
            </div>
      <Grid container direction="column" >
        <Grid item>
        <Divider />
        <Typography variant="h6" className={classes.content}>
          Challenge
          </Typography>
        
        <Divider />

        <ChallengeContent />
        <br />
        </Grid>

        <Grid item>
        <Divider />
        <Typography variant="h6" className={classes.content}>
          Instruction
          </Typography>
        <Divider />

        <InstructionContent />
        </Grid>
      </Grid>

        
      </Drawer>)
}

export default Instruction;


// const [open, setOpen] = React.useState(false);

// const handleDrawerOpen = () => {
// setOpen(true);
// };

// const handleDrawerClose = () => {
// setOpen(false);  
// };