import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

import { config } from 'dotenv';
config({ path: '../.env' });
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${CLIENT_URL}/api/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.findOne({ email: profile.emails[0].value });
                    if (user) {
                        user.googleId = profile.id;
                    } else {
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
                            googleId: profile.id,
                            role: 'MEMBER',
                        });
                    }
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
