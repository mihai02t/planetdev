import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@material-ui/icons/Facebook';

  class FacebookBtn extends React.Component {
 
    render() {
      return (
        <FacebookLogin
          appId="1088597931155576"
          autoLoad
          
          render={renderProps => (
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              onClick={renderProps.onClick}
              startIcon={<FacebookIcon />}>
                Sign in with Facebook
            </Button>
          )}
          callback={this.responseFacebook}
        />
      )
    }
  }
 
  export default FacebookBtn;