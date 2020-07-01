import mongoose from 'mongoose';
import asciify from 'asciify';
import { httpServer, apolloServer } from './app';
import {
  HOST,
  DATABASE_URI,
  PORT,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_CALLBACK_URL,
  API_VERSION,
  APPLICATION_NAME,
  NODE_ENV
} from './config';

const startServer = () => {
  console.log(`Starting ${APPLICATION_NAME} in ${NODE_ENV} ...`);
  httpServer.listen(PORT, () => {
    console.log(`SERVER HOSTNAME:         ${HOST}`);
    console.log(`PORT:                    ${PORT}`);
    console.log(`API VERSION:             ${API_VERSION}`);
    console.log(`GRAPH QL:                ${apolloServer.graphqlPath}`);
    console.log(`FACEBOOK AUTH CALLBACK:  ${FACEBOOK_CALLBACK_URL}`);
    console.log(`GOOGLE AUTH CALLBACK:    ${GOOGLE_CALLBACK_URL}`);
  });
};

const serverStatus = async () => {
  await asciify(APPLICATION_NAME, {}, (_err, res) => {
    console.log(res);
  });
};

const connectMongoDb = () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`MONGODB URL:             ${DATABASE_URI}`);
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
