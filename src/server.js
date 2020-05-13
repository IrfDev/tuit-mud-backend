const logger = require('./Lib/winston');
const error = require('./Middlewares/error');
const authCheck = require('./Middlewares/authCheck');

const resolvers = require('./usecases/resolvers');
const typeDefs = require('./Models/typeDefs/index');
const { ApolloServer } = require('apollo-server-express');

const cors = require('cors');

const passport = require('passport');
const passportSetup = require('./Lib/passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const express = require('express');

const app = express();


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

apolloServer.applyMiddleware({ app, path: '/graphql' })

process.on('uncaughtException', (ex) => {
    logger.logger.error(ex.message, ex)
    process.exit
})
process.on('unhandledRejection', (ex) => {
    logger.logger.error(ex.message, ex)
    process.exit
})

app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 100
    })
  );
app.use(cookieParser());

app.use(session({
  secret: 'SECRETTT',
}));
app.use(passport.initialize(passportSetup))
app.use(passport.session());

require('./Lib/routes')(app);


app.use(cors())

app.get("/", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  });


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

// Process it's a node object that return some information
console.log(`app:${app.get('env')}`)


// Aquí es dónde puedes aplicar algo de código dependiendo del entorno de programación que estés utilizando.
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
module.exports = app