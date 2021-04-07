import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ThreeMap from '../../Three/ThreeGame';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from './components/Dialog';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InfoCard from './components/InfoCard';

import { useRequiresAuthentication } from "../../utils/authService";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    }
});  

export const MAIN_PATH = '/main';

const Main = () => {
    const { loggedIn } = useRequiresAuthentication();

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    let open = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleChange = (_: any, newValue: any) => {
        setValue(newValue);
    };

    if(!loggedIn)
      return null;
    
    return (
        <div className="CenteredTabs">
        <CssBaseline/>
        
        
    
        <AppBar style ={{margin:0, display:"flex"}}>
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
    
        <Paper className="selectcard" style={{width:'30%', height:'60%', marginLeft:'60%', marginTop:'500px', zIndex: 1, position:'fixed'}}>
          <InfoCard/>
        </Paper>
    
    
        <Paper className="background" style={{width:'233px', marginRight:'10px', zIndex: -1, position: 'fixed'}}>
        <ThreeMap/>
        </Paper>
    
        </div>
        
      );
    
};

export default Main;