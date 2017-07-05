var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var models = require('./models/models');
// view engine setup
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    defaultLayout: false,
    partialsDir: "views/partials",
    ext: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'views'));

// uncomment after plcallacing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var auth = require('./sling/auth');
auth.addMidware(app);
auth.initStrategy();

var router = require('./routes/main.js');
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    console.log(err.message);
    res.send(err);
});

module.exports = app;