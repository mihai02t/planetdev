import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ThreeVoyage from "../../Three/ThreeVoyage";
import { useRequiresAuthentication } from "../../utils/authService";
import Challenge from "../../utils/types/Challenge";

import { MAIN_PATH } from "../Main";
import { fetchChallenges } from "./services";

export const VOYAGE_PATH = '/voyage/:no';

const Voyage = () => {
    const { loggedIn, user } = useRequiresAuthentication();
    const history = useHistory();
    const { no } = useParams() as { no: string };
    const planetNumber = Number(no);

    const [challenges, setChallenges] = React.useState([] as Challenge[]);

    useEffect(() => {
        const getData = async () => {
            if(!isNaN(planetNumber))
                setChallenges(await fetchChallenges(planetNumber));
        };
        
        getData();
    }, []);

    if(!loggedIn || !user || isNaN(planetNumber))
        return null;

    if(planetNumber > user.planetsUnlocked - 1) {
        toast('You have not unlocked this planet!');
        history.replace(MAIN_PATH);
        return null;
    }

    return (
        <div>
            {challenges.length && 
            <ThreeVoyage
                challenges={challenges}
                challengesOfUser={user.challenges} 
                history={history}
            />}
        </div>
    );
};

export default Voyage;