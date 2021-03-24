import path from 'path';
import dotenv from 'dotenv';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import UserDB, { User } from '../models/user.model';

dotenv.config({ path: path.join(__dirname, '.env') });

export const GooglePassport = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    await UserDB.findOne({ googleID: profile.id }, async (err: any, usr: User | null) => {
        if(err) console.log(err);
        if(!usr) {
            const newUser: User = await UserDB.create({
                googleID: profile.id,
                name: profile.name?.givenName || ""
            });
            return done(null, newUser);
        }
        return done(err, usr);
    });
});