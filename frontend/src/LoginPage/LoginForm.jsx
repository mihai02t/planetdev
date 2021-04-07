import React from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GoogleBtn from './GoogleBtn.jsx';
import FacebookBtn from './FacebookBtn.jsx';


function Copyright() {
    return (
      
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href='MainPage'>
          PlanetDev
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image_block: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

function LoginForm() {

    const classes = useStyles();

    return(
        
      
      <Typography>
      
          <FacebookBtn />

          <p/>

          <GoogleBtn/>
        


      </Typography>
    
    )
}

export default LoginForm;
