import React from 'react';
import Typography from '@material-ui/core/Typography';
import GoogleButton from '../GoogleButton';
import FacebookButton from '../FacebookButton';
// import FacebookButton from '../FacebookButton';

const LoginForm = () => {
    return (
        <div>
            <Typography style={{ marginBottom: "10%" }}>
                <GoogleButton/>
            </Typography>
            <Typography>
                <FacebookButton/>
            </Typography>
        </div>
    );
};

export default LoginForm;