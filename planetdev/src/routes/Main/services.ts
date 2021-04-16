import axios from '../../utils/axios';

import Challenge from "../../utils/types/Challenge";

export const fetchChallenges = async () => {
    const res = await axios.get('/api/challenges');

    return res.data.challenges as Challenge[][];
};