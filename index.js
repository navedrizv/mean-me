const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const authentication = require('./routes/authentication'); // Import Authentication Routes
const path = require('path'); // NodeJS Package for file paths
const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
const db = require('./database');
// const passport = require('passport');
// const strategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend
app.use('/authentication', authentication);

const sessionStore = new mysqlSession({}, db);

app.use(session({
  secret: 'asdkjhqwenmqi',
  resave: false,
  store: sessionStore,
  saveUninitialized: false, // to save cookie only after login
//   cookie: { secure: true } // for https
}));

// app.use(passport.initialize());
// app.use(passport.session());


// passport.use(new strategy(
//   function(username, password, cb) {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
//   })
// );


app.get('*', (req, res) => {
    // res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Node listens to this port
app.listen('8080', () => {
    console.log('Listening on port 8080');
})  