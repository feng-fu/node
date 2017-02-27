var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

// ¿?¿?¿?¿?¿?¿?
app.set('views', path.join(__dirname, 'views'));
// ¿?¿?¿?¿?¿?¿?¿? ejs
app.set('view engine', 'ejs');

// ¿?¿?¿?¿?¿?¿?¿?¿?
app.use(express.static(path.join(__dirname, 'public')));
// session ¿?¿?¿?
app.use(session({
  name: config.session.key,// ¿?¿? cookie ¿?¿?¿? session id ¿?¿?¿?¿?¿?
  secret: config.session.secret,// ¿?¿?¿?¿? secret ¿?¿?¿? hash ¿?¿?¿?¿? cookie ¿?¿?¿?¿?¿?¿? signedCookie ¿?¿?¿?
  resave: true,// ¿?¿?¿?¿? session
  saveUninitialized: false,// ¿?¿?¿? false¿?¿?¿?¿?¿?¿?¿? session¿?¿?¿?¿?¿?¿?¿?¿?
  cookie: {
    maxAge: config.session.maxAge// ¿?¿?¿?¿?¿?¿?¿?¿? cookie ¿?¿? session id ¿?¿?¿?¿?
  },
  store: new MongoStore({// ¿? session ¿?¿?¿? mongodb
    url: config.mongodb// mongodb ¿?¿?
  })
}));
// flash ¿?¿?¿?¿?¿?¿?¿?¿?¿?¿?
app.use(flash());

// ¿?¿?
routes(app);

// ¿?¿?¿?¿?¿?¿?¿?¿?¿?
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
