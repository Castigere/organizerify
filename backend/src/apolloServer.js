import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';

const models = require('./models');
import { findUserSession, parseRequestName } from './utils';
import loaders from './loaders';
import schema from './schema';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  cors: false,
  typeDefs: schema,
  resolvers,
  formatResponse: (res, req) => {
    if (req.response && req.response.http) {
      if (parseRequestName(req) === 'yourRequestNameHere') {
      }
    }
    return res;
  },
  introspection: process.env.NODE_ENV === 'development',
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        isAuth: connection.context.isAuth,
        currentUserRole: connection.context.currentUserRole,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }
    if (req) {
      // console.log('GQL REQUEST:', req.body);
      req.session.referer = req.headers.referer;
      return {
        isAuth: req.isAuthenticated(),
        currentUserRole: req.isAuthenticated() ? req.session.passport.user.role : null,
        currentUser: req.isAuthenticated() ? req.session.passport.user : null,
        req,
        models,
        mongoUpdateOptions: { new: true, runValidators: true },
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      };
    }
    return null;
  },
  subscriptions: {
    onConnect: (_connectionParams, webSocket) => {
      console.info(
        `Websocket upgrade request received from ${webSocket.upgradeReq.headers.origin}...`
      );
      findUserSession(webSocket)
        .then(req => {
          console.info(`Websocket from ${webSocket.upgradeReq.headers.origin} successfully opened`);
          return {
            isAuth: req.isAuthenticated(),
            currentUserRole: req.isAuthenticated() ? req.user.role : null
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDisconnect: webSocket => {
      console.info(`Websocket from ${webSocket.upgradeReq.headers.origin} closed`);
    }
  }
});

export default apolloServer;
