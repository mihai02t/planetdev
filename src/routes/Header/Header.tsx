import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { useLogOut } from '../../utils/authService';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    }
});  

const Header: React.FC<React.ReactNode> = ({ children }) => {
    const logout = useLogOut();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    let open = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar style={{margin:0, display:"flex"}}>
                <Box display="flex">
                    <Box>  
                        <Toolbar>
                            <Typography variant="h6">PlanetDev</Typography>
                        </Toolbar>
                    </Box>
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
                                <MenuItem onClick={logout}>Sign Out</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Header;