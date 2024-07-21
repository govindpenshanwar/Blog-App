const passport = require('passport');
const OAuthUsers = require('../Models/googleSignInUsers');
const googleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config()
console.log('uri => ', process.env.GOOGLE_REDIRECT_URI,)
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    passReqToCallback: true
},

    async (request, accessToken, refreshToken, profile, done) => {
        try {
            const user = await OAuthUsers.findOne({ email: profile.emails[0].value });
            if (user) {
                return done(null, user)
            } else {
                const newUser = new OAuthUsers({
                    username: profile.name.givenName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value
                });
                await newUser.save();
                return done(null, newUser)
            }
        } catch (error) {
            return done(err, null);
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (obj, done) => {
    try {
        const user = await OAuthUsers.findById(id);
        done(null, user)
    } catch {
        done(null, null);
    }
});
module.exports = passport;