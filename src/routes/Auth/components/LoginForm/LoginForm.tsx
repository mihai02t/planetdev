import React from 'react';
import Typography from '@material-ui/core/Typography';
import GoogleButton from '../GoogleButton';
import FacebookButton from '../FacebookButton';

const LoginForm = () => {
    return (
        <Typography>
            <GoogleButton/>

            <p/>

            <FacebookButton/>
        </Typography>
    );
};

export default LoginForm;