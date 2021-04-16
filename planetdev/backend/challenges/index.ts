import path from 'path';
import axios from "axios";
import dotenv from 'dotenv';
import { Response, Router } from "express";
import requiresAuthentication, { RequestWithAdmin } from "../auth/requiresAuth";
import ChallengesDB, { Challenge, Challenges } from "../models/challenges.model";
import { User } from '../models';

dotenv.config({ path: path.join(__dirname, '.env') });

const router = Router();

router.get(
    '/',
    [requiresAuthentication()],
    async (req: RequestWithAdmin, res: Response) => {
        const challenges = (await ChallengesDB.findOne()) as Challenges;

        if(challenges) {
            return res.json({ challenges: challenges.challenges });
        }
        return res.status(404).json({ errors: ['Not found'] });
    }
);

router.get(
    '/planet/:planet',
    [requiresAuthentication()],
    async (req: RequestWithAdmin, res: Response) => {
        const planetNumber = Number(req.params.planet);
        const challenges = (await ChallengesDB.findOne().slice('challenges', [planetNumber, 1]))?.challenges[0];

        if(challenges) {
            return res.json({ challenges });
        }
        return res.status(404).json({ errors: ['Not found'] });
    }
);

router.get(
    '/:id',
    [requiresAuthentication()],
    async (req: RequestWithAdmin, res: Response) => {
        const challengeId = req.params.id;
        let challenge = null as Challenge | null;
        const challenges = ((await ChallengesDB.findOne()) as Challenges).challenges;
        challenges.forEach((ChA: Challenge[]) => {
            if(challenge) return;
            ChA.forEach((ch: Challenge) => {
                if(ch._id.toString() === challengeId)
                    return (challenge = ch);
            });
        });

        if(challenge) {
            return res.json({ challenge });
        }
        return res.status(404).json({ errors: ['Not found'] });
    }
);

router.post(
    '/:id',
    [requiresAuthentication()],
    async (req: RequestWithAdmin, res: Response) => {
        const challengeId = req.params.id;
        const code = req.body.code as string;

        let challenge = null as Challenge | null;
        const challenges = ((await ChallengesDB.findOne()) as Challenges).challenges;
        challenges.forEach((ChA: Challenge[]) => {
            if(challenge) return;
            ChA.forEach((ch: Challenge) => {
                if(ch._id.toString() === challengeId)
                    return (challenge = ch);
            });
        });

        try {
            if(!challenge)
                throw new Error("Challenge not found");
            if(!req.loggedInUser)
                throw new Error("User not found");
            
            const userChallengeIndex = req.loggedInUser.challenges.findIndex(e => e.challengeId.toString() === challengeId);
            if(userChallengeIndex === -1)
                throw new Error("Cannot find challenge in user");

            // saving the user code
            req.loggedInUser.challenges[userChallengeIndex].code = code;
            await req.loggedInUser.save();
            
            if(!process.env.EVAL_URI)
                throw new Error("No test server available");

            axios
                .post(process.env.EVAL_URI, {
                    code,
                    tests: challenge.tests
                }, { timeout: 5000 })
                .then(async resp => {
                    if(resp.status === 201)
                        throw new Error(resp.data.message);
                    else if(resp.status === 200) {
                        const user = (req.loggedInUser as User);
                        user.challenges[userChallengeIndex].completed = true;
                        user.points += 100;
                        if(user.points % 500 === 0) {
                            user.planetsUnlocked += 1;
                            challenges[user.planetsUnlocked - 1].forEach((challenge: Challenge) => {
                                user.challenges.push({
                                    challengeId: challenge._id || '',
                                    code: '',
                                    completed: false
                                });
                            });
                        }
                        
                        await user.save();
                        return res.status(200).json({ message: "Code is correct" });
                    }
                })
                .catch(err => {
                    return res.status(400).json({ message: err.message });
                });

        } catch(err) {
            return res.status(400).json({ message: err.message });
        };
    }
);

export default router;