'use strict';
//REFERENCES: https://scotch.io/tutorials/easy-node-authentication-google

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { MUser } = require('mongoose').models;
const CONSTANTS = require('../../infrastructure/constants/constants');
const authenticationModule = require('../../domain/authentication/authentication.module');
const fetchUser = async (email, password, facebookData, googleData) => {
    let user = null;
    let filter = null;
    email = email ? email.replace(/\s/g, '') : email;
    if (email && password) {
        user = await authenticationModule.matchUser(email, password);
    } else if (email && (googleData || facebookData)) {
        filter = {
            $or: [
                { email: email },
                { 'google.email': email },
                { 'facebook.email': email },
            ],
        };
        user = await MUser.findOne(filter);
        if (user) {
            user.lastLogin = new Date();
            await user.save();
        }
    } else {
        if (facebookData && facebookData.id) {
            filter = {
                'facebook.id': { $eq: facebookData.id },
            };
        } else if (googleData && googleData.id) {
            filter = {
                'google.id': { $eq: googleData.id },
            };
        }
        user = await MUser.findOne(filter);
        if (user) {
            user.lastLogin = new Date();
            await user.save();
        }
    }
    return user;
};

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await MUser.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new LocalStrategy(async (accessKey, password, done) => {
        let data = await fetchUser(accessKey, password);
        done(null, data);
    }),
);

passport.use(
    new FacebookStrategy(
        {
            clientID: CONSTANTS.facebookAuth.clientID,
            clientSecret: CONSTANTS.facebookAuth.clientSecret,
            callbackURL: CONSTANTS.facebookAuth.callbackURL,
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(async function () {
                let facebookDataObject = {
                    id: profile.id,
                };
                let user = null;
                let email =
                    profile.emails && profile.emails[0].value
                        ? profile.emails[0].value
                        : null;
                if (email) user = await fetchUser(email, null, true);
                if (!user)
                    user = await fetchUser(null, null, facebookDataObject);
                if (user) {
                    user.facebook.token = token;
                    user.facebook.name = user.name = profile.displayName;
                    user.facebook.email =
                        profile.emails && profile.emails[0].value
                            ? profile.emails[0].value
                            : null;
                    await user.save();
                    done(null, user);
                } else {
                    var newUser = new MUser();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = newUser.name = profile.displayName;
                    newUser.facebook.email =
                        profile.emails && profile.emails[0].value
                            ? profile.emails[0].value
                            : null;
                    newUser.email = newUser.facebook.email
                        ? newUser.facebook.email
                        : `${profile.id}@facebook.com`;
                    let lastCheck = await MUser.findOne({
                        email: newUser.email,
                    });
                    if (!lastCheck) await newUser.save();
                    done(null, newUser);
                }
            });
        },
    ),
);

/**
 ** Tudo que diz respeito a conta google, esta associada ao email olhonocarroapp@gmail.com
 ** By: Diego Moura
 **/
passport.use(
    new GoogleStrategy(
        {
            clientID: CONSTANTS.googleAuth.clientID,
            clientSecret: CONSTANTS.googleAuth.clientSecret,
            callbackURL: CONSTANTS.googleAuth.callbackURL,
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(async function () {
                let googleDataObject = {
                    id: profile.id,
                };
                let email =
                    profile.emails && profile.emails[0].value
                        ? profile.emails[0].value
                        : null;
                let user = email
                    ? await fetchUser(email, null, null, true)
                    : null;
                user = !user
                    ? await fetchUser(null, null, null, googleDataObject)
                    : user;
                if (user) {
                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    user.google.email = email ? email : user.email;
                    await user.save();
                    done(null, user);
                } else {
                    var newUser = new MUser();
                    newUser.google.profile = profile;
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = newUser.name = profile.displayName;
                    newUser.google.email = newUser.email = email;
                    let lastCheck = await MUser.findOne({ email: email });
                    if (!lastCheck) await newUser.save();
                    done(null, newUser);
                }
            });
        },
    ),
);
