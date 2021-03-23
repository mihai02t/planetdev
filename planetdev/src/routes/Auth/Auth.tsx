import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useUser } from "../../utils/authService";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './components/LoginForm';

import { DASHBOARD_PATH } from '../Dashboard';
import ThreeLogin from './components/ThreeLogin';

export const LOGIN_PATH = '/login';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image_block: {
        //backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
}));

const Auth = () => {
    const history = useHistory();
    const { loading, loggedIn } = useUser();

    useEffect(() => {
        if (loggedIn) history.replace(DASHBOARD_PATH);
    }, [loggedIn]);

    const classes = useStyles();

    if (loading || loggedIn) return null;

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid className={classes.image_block} item xs={false} sm={false} md={8} component={Paper}>
                <Typography>
                    <Box 
                        textAlign="left" 
                        fontWeight="fontWeightLight" 
                        fontSize="8.4rem" 
                        p={2}
                        position = "absolute"
                        // top={0}
                        left="10%"
                        top="40%"
                        zIndex="modal"
                        color="white"
                    >
                        Planet<b>Dev</b> 
                        <Box  
                            fontWeight="fontWeightLight" 
                            fontSize="2.4rem"
                            //fontStyle="italic"
                            p={3}
                            position="absolute"
                            // top={0}
                            left="-0%"
                            top="65%"
                            zIndex="modal"
                        >
                            Coding, in an edutainment way. 
                        </Box>
                    </Box>
                    <ThreeLogin/>
                </Typography>
            </Grid>
            <LoginForm /> 
        </Grid>
    );
};

export default Auth;