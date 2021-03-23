import React from 'react'
import { AppBar, Toolbar, Typography, Box, Grid, Button} from '@material-ui/core'
import { Tab, Tabs, IconButton } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { MenuItem, Menu, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      background: '#3e3e3e',
    },
});

const DashboardHeader = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null as any);
    let open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (_: any, newValue: any) => {
        setValue(newValue);
    };

    return (
    <AppBar className={classes.root} position="static">
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
          <Button
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={(ev) => { handleMenu(ev)} }
          >
            <AccountCircle />
          </Button>

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
    );
};

export default DashboardHeader;
