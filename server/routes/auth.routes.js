const express = require('express');
const passport = require('../middlewares/passport');
require("dotenv").config();
const jwt = require('jsonwebtoken')
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ["email", "profile"] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        const jwtpayload = {
            username: req.user._json.given_name,
            email: req.user._json.email
        };
        const token = await jwt.sign(jwtpayload, process.env.tokenSecret, {
            expiresIn: "1d"
        })

        res.cookie("token", token, {
            httpOnly: true
        });
        res.redirect(`https://blog-app-mu-vert.vercel.app/auth-handler?id=${token}`)
    });


router.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user._json);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});
module.exports = router;