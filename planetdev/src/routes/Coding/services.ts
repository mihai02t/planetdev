import axios from '../../utils/axios';

import Challenge from "../../utils/types/Challenge";

export const fetchChallenge = async (id: string) => {
    const res = await axios.get(`/api/challenges/${id}`);

    return res.data.challenge as Challenge;
};

export const evaluateCode = async (id: string, code: string) => {
    const res = await axios.post(`/api/challenges/${id}`, {
        code
    });

    return { error: res.status === 400, message: res.data.message } as { error: boolean, message: string };
};