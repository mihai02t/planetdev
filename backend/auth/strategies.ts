import path from 'path';
import dotenv from 'dotenv';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import UserDB, { User } from '../models/user.model';
import ChallengesDB, { Challenge, Challenges } from '../models/challenges.model';

dotenv.config({ path: path.join(__dirname, '.env') });

export const GooglePassport = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    await UserDB.findOne({ googleID: profile.id }, async (err: any, usr: User | null) => {
        if(err) console.log(err);
        if(!usr) {
            const newUser: User = await UserDB.create({
                googleID: profile.id,
                name: profile.name?.givenName || ""
            });
            const firstChallenges = await ChallengesDB.findOne().slice('challenges', 1) as Challenges;
            firstChallenges.challenges[0].forEach((challenge: Challenge) => {
                newUser.challenges.push({
                    challengeId: challenge._id || '',
                    code: '',
                    completed: false
                });
            });
            await newUser.save();
            return done(null, newUser);
        }
        return done(err, usr);
    });
});