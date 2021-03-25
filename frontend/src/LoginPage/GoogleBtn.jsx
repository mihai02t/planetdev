import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from '@material-ui/core/Button'
import ShopIcon from '@material-ui/icons/Shop';



const CLIENT_ID = '483670294460-mcr53baceinernivibtram5i2958fv0h.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: 'Bq9QvV2ow35A5ahGAjduG66S'
    };

    this.login = this.login.bind(this);
    
    this.logout = this.logout.bind(this);

  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          clientId={ CLIENT_ID }
          render={renderProps => (
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              onClick={renderProps.onClick}
              startIcon={<ShopIcon />}>
                Log in with Google
            </Button>
          )}
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: 
        
        <GoogleLogin
          clientId={ CLIENT_ID }
          render={renderProps => (
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              onClick={renderProps.onClick}
              startIcon={<ShopIcon />}>
                Sign in with Google
            </Button>
          )}
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      

    </div>
    )
  }
}

export default GoogleBtn;
