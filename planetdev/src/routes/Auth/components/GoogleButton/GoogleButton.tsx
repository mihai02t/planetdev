import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ShopIcon from '@material-ui/icons/Shop';

import { loginService } from './services';
import { DASHBOARD_PATH } from '../../../Dashboard';
import { toast } from 'react-toastify';

const GoogleButton = () => {
    // const history = useHistory();

    const onGoogleClick = async () => {
        try {
            await loginService();
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
            onClick={async () => {await onGoogleClick();} }
            startIcon={<ShopIcon />}
        >
            Sign in with Google
        </Button>
    );
};

export default GoogleButton;
