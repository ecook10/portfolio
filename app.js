var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');


var App = function() {

    // Scope
    
    var self = this;
    self.app = express();

    /*

    // Setup app variables
    
    self.dbServer = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST, parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT));
    self.db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, self.dbServer, {auto_reconnect: true});
    self.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
    self.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

    self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
    self.port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

    if (typeof self.ipaddr === "undefined") {
        console.warn('No OPENSHIFT_NODEJS_IP environment variable');
    };


    // Routes

    var routes = require('./routes/index');
    var blog = require('./routes/blog');

    self.app.use('/', routes);
    self.app.use('/blog', blog);


    // View engine setup

    self.app.set('views', path.join(__dirname, 'views'));
    self.app.set('view engine', 'jade');

    self.app.use(favicon());
    self.app.use(logger('dev'));
    self.app.use(bodyParser.json());
    self.app.use(bodyParser.urlencoded());
    self.app.use(cookieParser());
    self.app.use(express.static(path.join(__dirname, 'public')));

    */


    // Logic to open a database connection. We are going to call this outside of app so it is available to all our functions inside.


    /*

    self.connectDb = function(callback){
    
        var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

        // if OPENSHIFT env variables are present, use the available connection info:
        if (process.env.OPENSHIFT_MONGODB_DB_URL) {
            url = process.env.OPENSHIFT_MONGODB_DB_URL +
            process.env.OPENSHIFT_APP_NAME;
        }

        // Connect to mongodb
        mongoose.connect(url);

        self.db = mongoose.connection;

        self.db.on('error', function(error){
            console.log("Error loading the db - "+ error);
        });

        self.db.on('disconnected', connect);
    };

    */

    //starting the nodejs server with express

    self.startServer = function() {
        self.app.listen(self.port, self.ipaddr, function() {
          console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
        });
    };



    // Destructors

    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
            process.exit(1);
        };
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    process.on('exit', function() { self.terminator(); });

    self.terminatorSetup = function(element, index, array) {
        process.on(element, function() { self.terminator(element); });
    };

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(self.terminatorSetup);
    
    

    // ERROR HANDLERS

    /// catch 404 and forwarding to error handler
    self.app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    // development error handler
    // will print stacktrace
    if (self.app.get('env') === 'development') {
        self.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    self.app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


};

// new express app
var app = new App();
app.startServer;

//call the connectDb function and pass in the start server command
//app.connectDb(app.startServer);
