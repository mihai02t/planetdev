import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';

// import { loginService } from './services';
import { DASHBOARD_PATH } from '../../../Dashboard';
import { toast } from 'react-toastify';

const FacebookButton = () => {
    // const history = useHistory();

    const onFacebookClick = async () => {
        try {
            // await loginService();
            // history.push(DASHBOARD_PATH);
        }
        catch(err) {
            toast(err.message);
            console.log(JSON.stringify(err));
        }
    };

    return (
        <Button 
            variant="contained" 
            fullWidth
            color="primary"
            // onClick={async () => {await onGoogleClick();} }
            startIcon={<FacebookIcon />}
        >
            Sign in with Facebook
        </Button>
    );
};

export default FacebookButton;
