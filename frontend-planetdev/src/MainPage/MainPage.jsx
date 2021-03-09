import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ThreeMap from 'ThreeMap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from './Dialog.jsx';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <div classname="CenteredTabs">
    <CssBaseline/>
    
    

    <AppBar style ={{margin:0}}  display="flex">
      <Box display="flex">

        <Box>  
          <Toolbar>
            <Typography variant="h6">PlanetDev</Typography>
          </Toolbar>
        </Box>

        <Box flexGrow={1} />
        <Toolbar>
        <Grid item>
          <Grid container justify={"center"}>
          
            <Tabs
              value={value}
              indicatorColor="primary"
              display="inline"
              
              onChange={handleChange}
             
            >
              <Tab label="Current Planet"/>
              <Tab label="Dash Board"  />
              <Tab label="Other Challenges" disabled/>
              
              <Dialog />
              
            </Tabs>
          
          </Grid>
        </Grid>
        </Toolbar>
                  
                  
        <Box flexGrow={1} />
        
          <Toolbar>
            <Box>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Sign Out</MenuItem>
          </Menu>
          </Box>

        </Toolbar>

        </Box>

      </AppBar>


      <ThreeMap style ={{margin:0}} display="flex"/>

    </div>
    
  );
}
