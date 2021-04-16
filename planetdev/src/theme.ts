import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  
  palette: {
    primary: {
      main: '#3e3e3e',
    },
    secondary: {
      main: '#ed7e00',
    },  
    error: orange,
  }
});

export default theme;
