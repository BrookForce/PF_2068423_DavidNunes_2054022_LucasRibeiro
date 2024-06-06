require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var createError = require('http-errors');
var cors = require('cors');

var usersRouter = require('./routes/users'); // Outros endpoints de usuário, se necessário
var tweetsRouter = require('./routes/tweets');
var followsRouter = require('./routes/follows');
var feedRouter = require('./routes/feed');
var likesRouter = require('./routes/likes');
var commentsRouter = require('./routes/comments');
var adminRouter = require('./routes/admin');
var { swaggerUi, specs } = require('./swagger');

var app = express();

// Configuração do CORS
app.use(cors({
    origin: '*', // Permite todas as origens. Modifique conforme necessário.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
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

// Rotas
app.use('/', usersRouter); // Ajustar para usar a raiz
app.use('/tweets', tweetsRouter);
app.use('/follows', followsRouter);
app.use('/feed', feedRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/admin', adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
