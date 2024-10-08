import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to start Google authentication
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // User is authenticated, generate JWT and send it to client
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    // Send the token to the client
    res.json({ success: true, token });
});

export default router;