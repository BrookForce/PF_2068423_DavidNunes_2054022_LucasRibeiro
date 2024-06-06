require('dotenv').config();

var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var createError = require('http-errors');
var cors = require('cors');

var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweets');
var followsRouter = require('./routes/follows');
var feedRouter = require('./routes/feed');
var likesRouter = require('./routes/likes');
var commentsRouter = require('./routes/comments');
var adminRouter = require('./routes/admin');
var { swaggerUi, specs } = require('./swagger');

var app = express();


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: process.env.TOKEN_SECRET, 
  resave: false, 
  saveUninitialized: false,
  cookie: { maxAge: 60000 } 
}));
app.use(flash());


app.use('/', usersRouter); 
app.use('/tweets', tweetsRouter);
app.use('/follows', followsRouter);
app.use('/feed', feedRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/admin', adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
