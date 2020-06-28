import http from 'http';
import apolloServer from './apolloServer';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const { host, mongoDb, sessionSecret, cookiePrefix } = require('./config');
import { HOST, DATABASE_URI, SESSION_SECRET, COOKIE_PREFIX, NODE_ENV } from './config';
const router = require('./routes/routes');
require('./config/passport')(passport);

const app = express();

const mongoSessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
);

app.use(
  session({
    name: COOKIE_PREFIX,
    secret: SESSION_SECRET,
    cookie: {
      path: '/',
      secure: NODE_ENV === 'production',
      sameSite: false,
      domain: HOST,
      maxAge: 900000000,
      httpOnly: false
    },
    resave: false,
    saveUninitialized: false,
    store: mongoSessionStore
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err);
  next();
});

apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

mongoose.Promise = require('bluebird');

mongoose.connect(DATABASE_URI, {
  // https://mongoosejs.com/docs/deprecations.html
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

module.exports = { app, apolloServer, httpServer };
