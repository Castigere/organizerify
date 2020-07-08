import http from 'http';
import path from 'path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';

const MongoStore = require('connect-mongo')(session);

import { HOST, DATABASE_URI, SESSION_SECRET, COOKIE_PREFIX, CORS_ORIGIN } from './config';
import router from './routes/routes';
import apolloServer from './apolloServer';

require('./config/passport')(passport);

const app = express();

const mongoSessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

app.use(
  cors({
    origin: CORS_ORIGIN,
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
      secure: false,
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

// app.use(morgan('combined'));

app.use('/', router);

apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

app.use(express.static(`${__dirname}/build`));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

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
