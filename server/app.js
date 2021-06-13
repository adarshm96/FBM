const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');
const v1public = require('./routes/v1.public');
const app = express();
const CONFIG = require('./config/config');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const User = require('../models').User;
const { to, ReE, ReS } = require('./services/util.service');
const authService = require('./services/auth.service');

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:", CONFIG.app)

//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', CONFIG.db_name);
}).catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
});
if (CONFIG.app === 'dev') {
  //models.sequelize.sync();//creates table if they do not already exist
  //models.sequelize.drop();
    models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

// CORS
app.use(cors());
app.use('/v1', v1public);
// app.use(passport.authenticate('jwt', { session: false }));

app.use('/', function (req, res) {
  res.statusCode = 200;//send the appropriate status code
  res.json({ status: "success", message: "This is default API which is called if no routes matches", data: {} })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});
