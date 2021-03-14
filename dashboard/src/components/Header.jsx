import React from 'react'
import { AppBar, Toolbar, Typography, Box, Grid} from '@material-ui/core'
import { Tab, Tabs, IconButton } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MenuItem, Menu, makeStyles} from '@material-ui/core';

// If need header in later interface, this file can be used
// haven't used theme api
const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      background: '#3e3e3e',
    },
  });

const Header = () => {
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

    return <AppBar className={classes.root}  display="flex" position="static">
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
}

export default Header;