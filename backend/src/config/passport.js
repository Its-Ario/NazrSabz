import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../utils/prisma.js';
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
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    user = await prisma.user.findUnique({
                        where: { email: profile.emails[0].value },
                    });

                    if (user) {
                        user = await prisma.user.update({
                            where: { id: user.id },
                            data: { googleId: profile.id },
                        });
                    } else {
                        user = await prisma.user.create({
                            data: {
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
                                googleId: profile.id,
                                role: 'MEMBER',
                            },
                        });
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
