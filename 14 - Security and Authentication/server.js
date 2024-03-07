const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const configGoogle = require('./config/google_secret.json');

const app = express();

const PORT = 3000;

// console.log(config);

// Save the session to the cokie
passport.serializeUser((user, done) => {
    console.log("****User****: ", user.id);
    done(null, user.id); // done(err, success)
})

// Read the session from the cokie
passport.deserializeUser((id, done) => {
    console.log("****Id****: ", id);
    // Search in database
    // User.findById(id).then(user => {
    //     done(null, user);
    // })
    done(null, id); // done(err, success)
})

const GOOGLE_STRATEGY = {
    callbackURL: '/auth/google/callback',
    clientID: configGoogle.web.client_id,
    clientSecret: configGoogle.web.client_secret,
    COOKIE_KEY_1: configGoogle.web.cookie_key_1,
    COOKIE_KEY_2: configGoogle.web.cookie_key_2
}

// console.log(AUTH_OPTIONS);

// Strategy(options: StrategyOptions, 
// verify: (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => void): Strategy

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log("AcessToken:", accessToken);
    console.log("RefreshToke:", refreshToken);
    console.log("Profile:", profile);
    console.log("Done:", done)
    done(null, profile);
}

passport.use(new Strategy(GOOGLE_STRATEGY, verifyCallback))

// Middleware
app.use(helmet());

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ GOOGLE_STRATEGY.COOKIE_KEY_1, GOOGLE_STRATEGY.COOKIE_KEY_2 ]
}));

app.use((req, res, next) => {

    // Stub out missing regenerate and save functions.
    // These don't make sense for client side sessions.
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        }
    }
    next();
})

app.use(passport.initialize());
app.use(passport.session());

// Authenticaiton
function checkLoggedIn(req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if(!isLoggedIn) {
        res.status(401).json({
            error: 'You must log in!' 
        })
    }
    next();
}

// Routes
app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['email']
    })
)

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/', 
        session: true
    }), 
    (req, res) => { // async change
        //console.log('Callback data:', req.user); // change
        console.log('Google called us back!');
        //res.redirect('/');
    }
)

app.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    }); // Terminate an existing login session. || Removes req.user clears any logged in session
})

app.get('/secret', checkLoggedIn, (req, res) => {
    res.send('your personal secret value is 42!')
})

app.get('/failure', (req, res) => {
    res.send('Failured log in')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


// Create Server
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})