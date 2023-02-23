import { Strategy, ExtractJwt } from "passport-jwt";

export default function setupJWTStrategy(passport){


    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "thisisasecretkey"
        }, function(payload, done){
           try {
            return done(null, {
                username:payload.username,
                id:payload.id
            })
           } catch (error) {
            return done(error, null)
           }
        })
    )

}
