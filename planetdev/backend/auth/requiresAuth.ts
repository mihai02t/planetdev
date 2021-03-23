import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export interface RequestWithAdmin extends Request {
    loggedInUser?: IUser;
}

const AUTH_PREFIX = 'Bearer ';

export async function getUserFromHeader(req: Request): Promise<IUser | null> {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith(AUTH_PREFIX)) return null;

    const token = authHeader.replace(AUTH_PREFIX, '');

    try {
        const googleID = jwt.verify(
            token,
            'edutainment'
        ) as string;

        const user = User.findOne({ googleID: googleID });
        return user;
    } catch {
        return null;
    }
};

export default function requiresAuthentication() {
    return async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
        const user = await getUserFromHeader(req);
  
        if (!user) {
            res.status(403).json({ errors: [{ msg: 'Unauthorized' }] });
            return;
        }
  
        req.loggedInUser = user;
  
        next();
    };
};