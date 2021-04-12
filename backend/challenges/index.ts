import { Response, Router } from "express";
import requiresAuthentication, { RequestWithAdmin } from "../auth/requiresAuth";
import ChallengesDB from "../models/challenges.model";

const router = Router();

router.get(
    '/:planet',
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

export default router;