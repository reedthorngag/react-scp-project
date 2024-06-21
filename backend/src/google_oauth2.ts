import { Express, NextFunction, Request, Response } from 'express';
import Logger from './util/logger.js';
import passport from 'passport';
import Google from 'passport-google-oauth2';
import V from 'validator';
import getErrorPage from './util/error_pages.js';
import crypto from 'crypto';

const GoogleStrategy = Google.Strategy;

function initGoogleOauth2(app:Express) {

    const callbackURL = process.env.BASE_URL! + process.env.CALLBACK_URL!;

    // Configure the Google OAuth2 strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: callbackURL,
        passReqToCallback: true
    }, async (req:any, accessToken:string, refreshToken:string, profile:any, done:(any)) => {
        // Here you can handle the user profile information returned by Google
        // You can save the user information in a database or use it to authenticate the user
        
        let user = await prismaClient.loginInfo.findUnique({
            select: {
                User: {
                    select: {
                        UserID: true,
                        IsAdmin: true,
                        IsBanned: true
                    }
                }
            },
            where: {
                GoogleID: profile.id,
                User: {
                    IsDeleted: false
                }
            }
        });

        console.log(user);

        if (!user) {
            const id = crypto.randomBytes(16).toString('hex');
            await prismaClient.user.create({
                data: {
                    UserID: id,
                    Bio: ''
                }
            });
            const createdUser = await prismaClient.loginInfo.create({
                data: {
                    GoogleID: profile.id,
                    Email: profile.email,
                    FirstName: profile.given_name,
                    UserID: id
                }
            });
            profile['noUserID'] = true;
            profile['UserID'] = createdUser?.UserID;
            return done(null, profile);
        }
        


        if (user?.User?.IsBanned) {
            return done(null, false);
        }

        profile['isAdmin'] = user.User!.IsAdmin;
        profile['UserID'] = user.User!.UserID;
        return done(null,profile);
    }));

    // Redirect the user to Google for authentication
    app.get(process.env.AUTH_URL!, passport.authenticate('google', {
            scope: process.env.SCOPE!.split(','),
            session: false,
            prompt: 'consent'
        }));


    app.get(process.env.CALLBACK_URL!, (req:Request,res:Response,next:NextFunction) => passport.authenticate('google', 
        {session: false},
        function(err:any,profile:any,info:any,status:any) {
            if (!profile) {
                res.redirect(process.env.FAILURE_REDIRECT+"?error=user%20banned");
                return;
            }

            res.send(`
                <html>
                    <script>
                        document.cookie = 'auth=${authenticator.createToken(profile.UserID,profile.isAdmin)}; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict; Secure;';
                        window.location.href = '${profile.noUserID?'/updateUserID':process.env.SUCCESS_REDIRECT}';
                    </script>
                </html>
            `);
        }
    )(req,res,next));
}

export default initGoogleOauth2;
