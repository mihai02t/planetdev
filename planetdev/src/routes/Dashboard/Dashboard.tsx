import { Grid } from '@material-ui/core'
import Header from './components/DashboardHeader'
import DashCard from './components/DashboardCard'
import { makeStyles } from '@material-ui/core/styles';

import { useRequiresAuthentication } from "../../utils/authService";

export const DASHBOARD_PATH = '/dashboard';

const styles = makeStyles({
    root: {
      flexGrow: 1,
    },
});  

const Dashboard = () => {
    const { loggedIn } = useRequiresAuthentication();

    const classes = styles();

    if(!loggedIn)
        return null;

    return (
        <div className={classes.root}>
            <Grid container direction='column'  spacing={2}>
                <Grid item>
                <Header />
                </Grid>
                <Grid item container>
                <Grid item sm={1} />
                <Grid item xs={12} sm={10}>
                    <DashCard />
                </Grid>
                <Grid item sm={1} />
                </Grid>
                
            </Grid>
        </div>
    );
};

export default Dashboard;