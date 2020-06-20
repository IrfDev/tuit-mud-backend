const passport = require('passport');
const User = require('../Models/User');
const clientFunction = require('../Lib/twitterauth')

const TwitterStrategy = require("passport-twitter");

passport.serializeUser(({ token, tokenSecret, profile}, done) => {
  done(null, {
    ref: token, 
    sec:tokenSecret,
    profile: {
      username: profile.username,
      name: profile.displayName,
      description: profile._json.description,
      twitterId: profile.id
    }
  });
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect"
    },
    async (token, tokenSecret, profile, done) => {
     await  User.findOne({twitterId:profile.id},(err, user)=>{
        if (!user) {
          const client = clientFunction(token, tokenSecret);
          client.get('/account/settings.json',{}, (err, settings, response) => {
            const locations = settings.trend_location
            User.create({locations, twitterId: profile.id})
          });
        } else {
          user
        };
      })
      // This functions is only for store the user, not affect the login or analysis process
      done(null, {profile, token, tokenSecret});
    }
  )
);

