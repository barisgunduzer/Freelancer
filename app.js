const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mainRouter = require('./routers/mainRouter');

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Connect DB
mongoose
  .connect('mongodb://localhost/freelancer-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//Global Variables
global.userIN = null;

// Middlewares
app.use(express.static('public'));

app.use(fileUpload());

app.use(express.json()); // for parsing application/json

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/freelancer-test-db',
    }),
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routers
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', mainRouter);

// Configs
const port = 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
