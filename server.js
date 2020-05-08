const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express(),
  methodOverride = require('method-override'),
  Blog = require('./models/blogpost'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('./models/user')

// const url = process.env.DATABASEURL || "mongodb://localhost:27017/restful_blog_app";

// Mongo URI
const mongoURI = process.env.DATABASEURL || 'mongodb://localhost:27017/restful_blog_app';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    console.log("connected to DB")
})
.catch(err => {
    console.log("error", err.message)
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//send currentUser to all rendered pages
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride("_method"));

const indexRoutes = require('./Routes/index')

app.use(indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log(`Server is running!`);
})
