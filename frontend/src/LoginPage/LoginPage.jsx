import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ThreeMap_login from '../ThreeMap_login.js';
import LoginForm from './LoginForm.jsx';
import GoogleBtn from './GoogleBtn.jsx';
import FacebookBtn from './FacebookBtn.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    
   
    paper: {
      padding:theme.spacing(2),
      //margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: "primary",
    },
    login: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  

function LoginPage() {
    const classes = useStyles();
    return(
    
    <Grid 
      container 
      component="main" 
      className={classes.root}
      
      >
      
      <ThreeMap_login style={{zIndex: '-1', position: 'fixed'}}/>
      <CssBaseline />

          
          
        <Typography style={{  marginRight:'100px', zIndex: '0', position: 'fixed'}}>
            <Box 
              textAlign="center" 
              fontWeight="fontWeightLight" 
              fontSize="8.4rem" 
              p={1}
              position = "absolute"
              left="300px"
              top="40%"
              zIndex="modal"
              color="white"
              width = "1200px"
              >
              


              <Box
                textAlign="center" 
                //fontWeight="fontWeightLight" 
                //fontSize="8.4rem" 
                p={2}
                position = "absolute"
        
                left="650px"
                top="70px"
                zIndex="modal"
                color="white"
                
                >
                <LoginForm />
              </Box>  
              

              <Box  
                fontWeight="fontWeightLight" 
                fontSize="8.4rem"

                p={0}
                position="absolute"
                top={0}
                left="0%"
                top="25%"
                
                zIndex="modal">
                  Planet<b>Dev</b> 

                  <Box  
                  fontWeight="fontWeightLight" 
                  fontSize="2.4rem"
                  p={1}
                  position="absolute"
                  top={0}
                  left="0%"
                  top="70%"
                  
                  zIndex="modal">
                    Coding, in an edutainment way. 
                </Box>

              </Box>

              

            </Box>
            </Typography>
          
        
        
        
      </Grid>
      

    );
}

export default LoginPage