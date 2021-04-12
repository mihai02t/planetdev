import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';

import { DASHBOARD_PATH } from '../../../Dashboard';
import { toast } from 'react-toastify';

const FacebookButton = () => {
    // const history = useHistory();

    const onFbClick = async () => {
    };

    return (
        <Button 
            variant="contained" 
            fullWidth
            color="primary"
            startIcon={<FacebookIcon />}
        >
            Sign in with Facebook
        </Button>
    );
};

export default FacebookButton;
