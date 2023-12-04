require('dotenv').config();
let nodemailer = require('nodemailer');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

let mongoose = require('mongoose');
let URI = process.env.MONGODB_URI;
mongoose.connect(URI);
let mongodDB = mongoose.connection;
mongodDB.on("error", console.error.bind(console, "Connection Error"));
mongodDB.once("open", ()=>{console.log("MongoDB Connected")});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Authentication Section

let session = require('express-session');
let MongoStore = require('connect-mongo'); // Import connect-mongo
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Creates a user model instance
let userModel = require('../models/user');
let User = userModel.User;

// Set-up Express-Session with MongoStore
app.use(session({
  secret: "SomeSecret",
  store: MongoStore.create({ mongoUrl: URI }),
  saveUninitialized: false,
  resave: false
}));

// Initialize flash-connect
app.use(flash());

// Implement user authentication
passport.use(User.createStrategy());

// Serialize and Deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to attach displayName to res.locals
app.use((req, res, next) => {
  res.locals.displayName = req.user ? req.user.displayName : '';
  next();
});

//Routes Section

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let eidRouter = require('../routes/eid');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/eidgiftlist', eidRouter);

// POST route from contact form
app.post('/send', (req, res) => {
  // Basic security check
  if(req.body.securityCheck !== '4') {
    res.send("Security check failed.");
    return;
  }

  // SMTP transporter object creation
  let transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Message object
  let message = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'New Message from ' + req.body.email,
    text: 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage: ' + req.body.comments,
    html: '<p><b>Name:</b> ' + req.body.name + '</p><p><b>Email:</b> ' + req.body.email + '</p><p><b>Message:</b> ' + req.body.comments + '</p>'
  };

  // Send mail with the transport object
  transporter.sendMail(message, (error, info) => {
    if (error) {
      res.send("Error occurred.");
      console.log('Error occurred. ' + error.message);
      return;
    }

    console.log('Message sent: %s', info.messageId);
    res.send("Message sent successfully!");
  });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: "Error"
  });
});

module.exports = app;
