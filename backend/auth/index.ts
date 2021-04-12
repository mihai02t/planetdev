import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from '../models';
import requiresAuthentication, { RequestWithAdmin } from './requiresAuth';

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        let responseHTML = '<html><head><title>Google Auth</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*"); window.close();</script></html>';
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            token: jwt.sign(
                (req.user as User).googleID,
                'edutainment'
            )
        }));
        res.status(200).send(responseHTML);
    }
);

router.get(
    '/',
    [requiresAuthentication()],
    async (req: RequestWithAdmin, res: Response) => {
        res.json({ user: req.loggedInUser });
    }
);

export default router;