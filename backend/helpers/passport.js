import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js"; // Adjust this path based on your file structure
import dotenv from "dotenv";

dotenv.config({ path: "config/config.env" });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
        // Find or create the user in your database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            });
        }
        done(null, user);
        } catch (error) {
        done(error, null);
        }
    }
));

export default passport;