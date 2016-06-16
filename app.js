var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var log = require('./utils/log4js.js');
log.use(app);
var logger=log.logger;

var zhihu = require('./crawler/routes/zhihu.js');
/*
var log4js = require('log4js');
log4js.configure('log4js/log4js.json');

var loggers= log4js.getLogger('normal');
loggers.setLevel('ALL');
app.use(log4js.connectLogger(loggers, {level:log4js.levels.INFO}));
*/
/*
var log4js = require("log4js");
var log4js_config =JSON.parse(fs.readFileSync("log4js/log4js.json", "utf8"));
log4js.configure(log4js_config);
*/

/*
var LogFile = log4js.getLogger('normal');

*/

console.log("log_start end!");

console.info('开始测试');

//loggers.info('开始测试哈哈哈哈哈');
logger.info('log4js配置完成');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/zhihu', zhihu);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
