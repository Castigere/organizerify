import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { PROTOCOL, HOSTNAME, PORT, WEBSOCKET_PROTOCOL } from 'config';
import consoleLogger from '@castigere/apollo-link-console-log';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `${PROTOCOL}//${HOSTNAME}:${PORT}/graphql`,
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: `${WEBSOCKET_PROTOCOL}//${HOSTNAME}:${PORT}/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: ApolloLink.from([consoleLogger, link]),
  cache
});

export { apolloClient };
