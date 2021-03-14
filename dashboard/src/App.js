import {BrowserRouter, Route} from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Header from './components/Header.jsx'
import DashCard from './components/DashboardCard.jsx'
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {
  const classes = styles(); 
  return (
    // <BrowserRouter>.
    <div className={classes.root}>
      {/* <Route path='/about' component={about} /> */}
      <Grid container direction='column'  spacing={2}>
        <Grid item>
          <Header />
          </Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <DashCard />
          </Grid>
          <Grid item xs={0} sm={1} />
        </Grid>
        
      </Grid>
    </div>
    // </BrowserRouter>
  );
}


export default App;
// This dashboard have not used theme.js