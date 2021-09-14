const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const mainRouter = require('./routers/mainRouter')

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Connect DB

// Middlewares
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routers
app.use('/', mainRouter);

// Configs
const port = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });