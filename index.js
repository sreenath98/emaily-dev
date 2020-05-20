const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);
mongoose.connection.on("error", err => {
  console.log(err);
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./router/authroute")(app);
require('./router/billingRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
