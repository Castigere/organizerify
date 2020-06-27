const mongoose = require('mongoose');
const asciify = require('asciify');
const { httpServer, apolloServer } = require('./app');
const { host, mongoDb, port, facebookAuth, googleAuth, api, appName } = require('./config/config');

const startServer = () => {
  console.log(`Starting ${appName} in ${process.env.NODE_ENV} ...`);
  httpServer.listen(port, () => {
    console.log(`SERVER HOSTNAME:         ${host}`);
    console.log(`PORT:                    ${port}`);
    console.log(`API VERSION:             ${api}`);
    console.log(`GRAPH QL:                ${apolloServer.graphqlPath}`);
    console.log(`FACEBOOK AUTH CALLBACK:  ${facebookAuth.callbackURL}`);
    console.log(`GOOGLE AUTH CALLBACK:    ${googleAuth.callbackURL}`);
  });
};

const serverStatus = async () => {
  await asciify(appName, {}, (err, res) => {
    console.log(res);
  });
};

const connectMongoDb = () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`MONGODB URL:             ${mongoDb}`);
    serverStatus();
  });
};

exports.startApp = async () => {
  try {
    await startServer();
    await connectMongoDb();
  } catch (err) {
    throw new Error('Error starting express server:', err);
  }
};
