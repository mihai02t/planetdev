import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'

import ThreeGame from '../../Three/ThreeGame';
import InfoCard from './components/InfoCard';

import { useRequiresAuthentication } from "../../utils/authService";
import { fetchChallenges } from './services';

export const MAIN_PATH = '/main';

const Main = () => {
    const { loggedIn, user } = useRequiresAuthentication();

    const [solved, setSolved] = useState([0, 0, 0, 0]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      const doEffect = async () => {
        const challenges = await fetchChallenges();
        // console.log(challenges);
        // console.log(user);
        if(user) {
          for(let i = 0; i < challenges.length; i++) {
            for(let j = 0; j < challenges[i].length; j++)
              if(user.challenges.find(x => x.challengeId === challenges[i][j]._id && x.completed)) {
                const t = solved;
                t[i]++;
                setSolved(t);
              }
          }
          setUpdate(true);
        }
        // console.log(solved);
      };

      doEffect();
      // console.log(solved);
    }, [user]);

    if(!loggedIn || !user)
      return null;
    
    return (
      <Paper className="background" style={{ width: '233px', marginRight: '10px', zIndex: -1, position: 'fixed' }}>
        {update && <InfoCard solved={solved} currentPlanet={user.planetsUnlocked - 1}/>}
        {/* {solved} */}
        <ThreeGame/>
      </Paper>
    );
};

export default Main;