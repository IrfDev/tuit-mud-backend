const passport = require('passport');
const User = require('../Models/User')

const TwitterStrategy = require("passport-twitter");

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, {
    name: user.profile.username,
    screen_name: user.profile.displayName,
    user: user.profile.id,
    token: user.token,
    tokenSecret:user.tokenSecret,
  });
});

passport.deserializeUser((id, done) => {
  console.log(id)
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
      // const currentUser = await User.create({
      //   twitterId: profile._json.id_str
      // })
      done(null, {profile, token, tokenSecret});
    }
  )
);

