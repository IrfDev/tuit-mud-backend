const logger = require("./Lib/winston");
const error = require("./Middlewares/error");
const authCheck = require("./Middlewares/authCheck");

const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./Lib/passport");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const express = require("express");

const app = express();

// Log in database all the fatal errors

process.on("uncaughtException", (ex) => {
  logger.logger.error(ex.message, ex);
  process.exit;
});
process.on("unhandledRejection", (ex) => {
  logger.logger.error(ex.message, ex);
  process.exit;
});

// Starting sesions and cookie parsing

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: "SECRETTT",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000000, secure: false, httpOnly: false },
  })
);

// Starting passport and passport sessions
app.use(passport.initialize(passportSetup));
app.use(passport.session());

// All the routes (always declaring after passport and cookies)

require("./Lib/routes")(app);

app.use(cors());

// For the main route

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: [req.cookies, req.user],
  });
});

console.log(`app:${app.get("env")}`);

module.exports = app;
