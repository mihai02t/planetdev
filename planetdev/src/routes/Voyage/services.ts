import axios from '../../utils/axios';

import Challenge from "../../utils/types/Challenge";

export const fetchChallenges = async (planet: number) => {
    const res = await axios.get(`/api/challenges/${planet}`);

    return res.data.challenges as Challenge[];
};