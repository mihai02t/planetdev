import Paper from '@material-ui/core/Paper'

import ThreeGame from '../../Three/ThreeGame';
import InfoCard from './components/InfoCard';

import { useRequiresAuthentication } from "../../utils/authService";

export const MAIN_PATH = '/main';

const Main = () => {
    const { loggedIn, user } = useRequiresAuthentication();

    if(!loggedIn || !user)
      return null;
    
    return (
      <Paper className="background" style={{ width: '233px', marginRight: '10px', zIndex: -1, position: 'fixed' }}>
        <InfoCard currentPlanet={user.planetsUnlocked - 1}/>
        <ThreeGame/>
      </Paper>
    );
};

export default Main;