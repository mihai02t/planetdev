import { Response, Router } from "express";
import requiresAuthentication, { RequestWithAdmin } from "../auth/requiresAuth";
import ChallengesDB, { Challenge, Challenges } from "../models/challenges.model";

const router = Router();

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

export default router;