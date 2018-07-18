var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var mysql = require('mysql');
const storage = require('node-persist');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(session({
    secret: 'omer5000',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    res.locals.account = req.session.account;
    next();
});

if (process.env.SELECTED_DATABASE == "mongoDB") {

    mongoose.connect(process.env.DB_URL_MONGODB, { useNewUrlParser: true });

    mongoose.connection.on("open", function () {
        console.log("MongoDB Bağlantı Tamam");
    });
    mongoose.connection.on("error", function (err) {
        console.log("Hata :" + err);
    });

} else if (process.env.SELECTED_DATABASE == "json") {
    storage.initSync();
    console.log("Json Bağlantı Tamam");
    
} 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
