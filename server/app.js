var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));//配置网站的标题显示图标
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', require('./routes'));


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
  res.render('error',{title:'error'});
});

module.exports = app;
