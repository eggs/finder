var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PlaceFinder = require('./lib/place-finder');
var placeFinder = new PlaceFinder();

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(app.router);

app.get('/', function(req, res){
  res.type('text/html');
  res.send(fs.readFileSync('./index.html'));
});
app.get('/users', users.list);

app.get('/search', function(req, res){

  var ll = [req.query.latitude, req.query.longitude];

  placeFinder.search(ll, function(err, businesses){
    res.type('application/json');
    res.send(businesses);
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
