import axios from '../../utils/axios';

import Challenge from "../../utils/types/Challenge";

export const fetchChallenge = async (id: string) => {
    const res = await axios.get(`/api/challenges/${id}`);

    return res.data.challenge as Challenge;
};